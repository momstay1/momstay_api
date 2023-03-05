import { Injectable } from '@nestjs/common';
import { NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isEmpty, map, reduce, union } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { ProductService } from 'src/product/product.service';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './entities/review.entity';

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
}
