import { Injectable } from '@nestjs/common';
import { NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isArray, isEmpty, map, reduce, union } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { ProductService } from 'src/product/product.service';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { In, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './entities/review.entity';

const delete_status = 1;
@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity) private reviewRepository: Repository<ReviewEntity>,
    private readonly productService: ProductService,
    private readonly userService: UsersService,
    private readonly fileService: FileService,
  ) { }

  async create(userInfo: UsersEntity, createReviewDto: CreateReviewDto, files) {
    if (get(createReviewDto, 'depth', 0) > 0 && get(createReviewDto, 'group', 0) == 0) {
      throw new UnprocessableEntityException('처리 할 수 없습니다.');
      
    }
    // 숙소 정보 가져오기
    const prd = await this.productService.findOneIdx(+get(createReviewDto, 'productIdx'));
    
    // 회원 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));
    
    const review_data = {
      status: get(createReviewDto, 'status'),
      depth: get(createReviewDto, 'depth', 0),
      star: get(createReviewDto, 'star', 0),
      product: prd,
      user: user,
      contents: get(createReviewDto, 'contents'),
    };

    if (get(createReviewDto, 'group', '')) review_data['group'] = get(createReviewDto, 'group');
    // 후기 등록
    const reviewEntity = await this.reviewRepository.create(review_data);
    let review = await this.reviewRepository.save(reviewEntity);
    // group정보가 없거나 depth가 0인경우 group에 review idx 저장
    if (get(review, 'depth') == 0 && get(review, 'group') == 0) {
      review['group'] = review['idx'];
      review = await this.reviewRepository.save(review);
    }

    // 숙소 평균 평점 계산
    await this.averageStar(review);
    
    // 새 첨부파일 등록
    const [fileIdxs] = await this.fileService.createByRequest(files, review['idx']);
    console.log({fileIdxs});

    let file_info;
    if (fileIdxs.length > 0) {
      file_info = await this.fileService.findIndexs(fileIdxs);
    }

    return {review, file_info};
  }

  findAll() {
    return `This action returns all reviews`;
  }

  async findAllIdxs(idxs: []) {
    if (idxs.length <= 0) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const reviews = await this.reviewRepository.find({
      where: {idx: In(idxs)},
      relations: ['product', 'user']
    });
    if (reviews.length <= 0) {
      throw new NotFoundException('정보를 찾을 수 없습니다.');
    }
    return reviews;
  }

  async findAllProduct(idx: number, options: PaginationOptions, search: string[], order: string) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);
    
    where['status'] = get(where, 'status', '2');
    const depth_zero = 0;

    const alias = 'review';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(order_by, alias + '.createdAt', 'DESC');

    // depth 0인 후기 리스트 가져오기
    const [results, total] = await this.reviewRepository.createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.product', 'product')
      .where(qb => {
        qb.where('`review`.`status` IN (:status)', {status: isArray(where['status'])?where['status']:[where['status']]})
        qb.andWhere('`review`.`depth` = :depth', {depth: depth_zero})
        qb.andWhere('`product`.`idx` = :productIdx', {productIdx: idx})
      })
      .orderBy(order_by)
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const review_idxs = map(results, o => o.idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(['reviewImg'], review_idxs);
      file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
    } catch (error) {
      console.log('후기 상세 이미지 파일 없음');
    }
    
    const data = new Pagination({
      results,
      total,
    });

    // 답글 기능은 별도로 추가
    // let reply = await this.reviewRepository.createQueryBuilder('review')
    // .leftJoinAndSelect('review.user', 'user')
    // .leftJoinAndSelect('review.product', 'product')
    // .where(qb => {
    //   qb.where('`review`.`status` IN (:status)', {status: isArray(where['status'])?where['status']:[where['status']]});
    //   qb.andWhere('`review`.`group` IN :group', {group: review_idxs});
    //   qb.andWhere('`review`.`depth` > :depth', {depth: depth_zero});
    // })
    // .skip((take * (page - 1) || 0))
    // .take((take || 10))
    // .getMany();

    // reply = commonUtils.getArrayKey(reply, ['group'], true);

    return {data, file_info};
  }

  async findAllUser(userInfo: UsersEntity, options: PaginationOptions, search: string[], order: string) {
    const { take, page } = options;
    
    // 회원 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));

    const where = commonUtils.searchSplit(search);
    
    where['status'] = get(where, 'status', '2');
    const depth_zero = 0;

    const alias = 'review';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(order_by, alias + '.createdAt', 'DESC');

    // depth 0인 후기 리스트 가져오기
    const [results, total] = await this.reviewRepository.createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.product', 'product')
      .where(qb => {
        qb.where('`review`.`status` IN (:status)', {status: isArray(where['status'])?where['status']:[where['status']]})
        qb.andWhere('`review`.`depth` = :depth', {depth: depth_zero})
        qb.andWhere('`user`.`idx` = :userIdx', {userIdx: user['idx']})
      })
      .orderBy(order_by)
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const review_idxs = map(results, o => o.idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(['reviewImg'], review_idxs);
      file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
    } catch (error) {
      console.log('후기 상세 이미지 파일 없음');
    }
    
    const data = new Pagination({
      results,
      total,
    });

    // 답글 기능은 별도로 추가
    // let reply = await this.reviewRepository.createQueryBuilder('review')
    // .leftJoinAndSelect('review.user', 'user')
    // .leftJoinAndSelect('review.product', 'product')
    // .where(qb => {
    //   qb.where('`review`.`status` IN (:status)', {status: isArray(where['status'])?where['status']:[where['status']]});
    //   qb.andWhere('`review`.`group` IN :group', {group: review_idxs});
    //   qb.andWhere('`review`.`depth` > :depth', {depth: depth_zero});
    // })
    // .skip((take * (page - 1) || 0))
    // .take((take || 10))
    // .getMany();

    // reply = commonUtils.getArrayKey(reply, ['group'], true);

    return {data, file_info};
  }

  async averageStar(review: ReviewEntity) {
    const star_data = await this.reviewRepository.createQueryBuilder('review')
      .select('SUM(`review`.`star`)', 'total_star')
      .addSelect('COUNT(`review`.`idx`)', 'review_cnt')
      .leftJoin('review.product', 'product')
      .leftJoin('review.user', 'user')
      .where(qb => {
        qb.where('`review`.`status` = :status', {status: 2})
        qb.andWhere('`user`.`idx` = :userIdx', {userIdx: review['user']['idx']})
        qb.andWhere('`product`.`idx` = :productIdx', {productIdx: review['product']['idx']})
      })
      .execute();

    const average_star = (star_data[0].total_star / star_data[0].review_cnt).toFixed(1);
    const reviews_cnt = star_data[0].review_cnt;

    await this.productService.updateAverageStar(review['product']['idx'], {
      star: +average_star,
      reviewCount: +reviews_cnt,
    });
  }

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const review = await this.reviewRepository.findOne({
      where: {idx: idx},
      relations: ['product', 'user']
    });
    if (!get(review, 'idx', '')) {
      throw new NotFoundException('정보를 찾을 수 없습니다.');
    }
    return review;
  }

  async findOne(idx: number) {
    const review = await this.findOneIdx(idx);
    
    if (review['status'] == delete_status) {
      throw new NotFoundException('삭제된 후기 입니다.');
    }
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(['reviewImg'], [review['idx']]);
      file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
    } catch (error) {
      console.log('후기 상세 이미지 파일 없음');
    }
    return {review, file_info};
  }

  async update(idx: number, userInfo: UsersEntity, updateReviewDto: UpdateReviewDto, files) {
    const prevReview = await this.findOneIdx(idx);
    console.log(prevReview['star']);

    // 회원 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));
    if (!commonUtils.isAdmin(user['group']['id'])) {
      // 일반 사용자인 경우 자신의 후기 글인지 체크
      if (prevReview['user']['idx'] != user['idx']) {
        throw new UnauthorizedException('권한이 없습니다.');
      }
    }

    const {star} = prevReview;
    console.log({star});
    if (get(updateReviewDto, 'status', '')) prevReview['status'] = get(updateReviewDto, 'status');
    if (get(updateReviewDto, 'star', '')) prevReview['star'] = get(updateReviewDto, 'star');
    if (get(updateReviewDto, 'contents', '')) prevReview['contents'] = get(updateReviewDto, 'contents');
    const review = await this.reviewRepository.save(prevReview);
    // 숙소 평균 평점 계산

    await this.averageStar(review);

    // 유지 안하는 이전파일 제거
    await this.fileService.removeByRequest(updateReviewDto, review['idx'], ['reviewImg']);
    
    // 새 첨부파일 등록
    await this.fileService.createByRequest(files, review['idx']);

    let file_info;
    try {
      file_info = await this.fileService.findCategory(['reviewImg'], ''+review['idx']);
    } catch (error) {
      console.log({error});
    }
      

    return {review, file_info};
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }

  async statusUpdate(idxs: [], userInfo: UsersEntity) {
    if (idxs.length <= 0) {
      throw new NotFoundException('삭제할 정보가 없습니다.');
    }

    // 회원 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));
    // 후기 정보 가져오기
    const reivews = await this.findAllIdxs(idxs);
    if (!commonUtils.isAdmin(user['group']['id'])) {
      // 일반 사용자인 경우 후기 한개씩만 삭제 가능
      if (idxs.length > 1 || reivews.length > 1) {
        throw new UnprocessableEntityException('삭제할 수 없습니다.');
      }
      // 일반 사용자인 경우 자신의 후기 글인지 체크
      if (reivews[0]['user']['idx'] != user['idx']) {
        throw new UnauthorizedException('권한이 없습니다.');
      }
    }

    await this.reviewRepository.createQueryBuilder()
      .update()
      .set({status: delete_status})
      .where("idx IN (:idxs)", { idxs: idxs })
      .execute()
  }
}
