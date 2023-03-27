import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';
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
import { ExcelService } from 'src/excel/excel.service';

const deleteStatus = -1;
const unregisteredStatus = 1;
const registrationStatus = '2';
const depthZero = 0;
@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    private readonly productService: ProductService,
    private readonly userService: UsersService,
    private readonly fileService: FileService,
    private readonly excelService: ExcelService,
  ) { }

  async create(userInfo: UsersEntity, createReviewDto: CreateReviewDto, files) {
    if (
      get(createReviewDto, 'depth', 0) > 0 &&
      get(createReviewDto, 'group', 0) == 0
    ) {
      throw new UnprocessableEntityException(
        'reviews.service.create: 처리 할 수 없습니다.',
      );
    }
    // 숙소 정보 가져오기
    const prd = await this.productService.findOneIdx(
      +get(createReviewDto, 'productIdx'),
    );

    // 회원 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));

    const review_data = {
      status: get(createReviewDto, 'status'),
      depth: get(createReviewDto, 'depth', 0),
      star: get(createReviewDto, 'star', 0),
      product: prd,
      user: user,
      contents: get(createReviewDto, 'contents'),
      start: get(createReviewDto, 'start'),
      end: get(createReviewDto, 'end'),
    };

    if (get(createReviewDto, 'group', ''))
      review_data['group'] = get(createReviewDto, 'group');
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
    const [fileIdxs] = await this.fileService.createByRequest(
      files,
      review['idx'],
    );
    console.log({ fileIdxs });

    let file_info;
    if (get(fileIdxs, ['length'], 0) > 0) {
      file_info = await this.fileService.findIndexs(fileIdxs);
    }

    return { review, file_info };
  }

  findAll() {
    return `This action returns all reviews`;
  }

  async findAllIdxs(idxs: []) {
    if (idxs.length <= 0) {
      throw new NotFoundException(
        'reviews.service.findAllIdxs: 잘못된 정보 입니다.',
      );
    }
    const reviews = await this.reviewRepository.find({
      where: { idx: In(idxs) },
      relations: ['product', 'user'],
    });
    if (reviews.length <= 0) {
      throw new NotFoundException(
        'reviews.service.findAllIdxs: 정보를 찾을 수 없습니다.',
      );
    }
    return reviews;
  }

  async findAllProduct(
    idx: number,
    options: PaginationOptions,
    search: string[],
    order: string,
  ) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);

    where['status'] = get(where, 'status', [registrationStatus]);

    const alias = 'review';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(
      order_by,
      alias + '.createdAt',
      'DESC',
    );

    // depth 0인 후기 리스트 가져오기
    const [results, total] = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.product', 'product')
      .where((qb) => {
        qb.where('`review`.`status` IN (:status)', {
          status: isArray(where['status'])
            ? where['status']
            : [where['status']],
        });
        qb.andWhere('`review`.`depth` = :depth', { depth: depthZero });
        qb.andWhere('`product`.`idx` = :productIdx', { productIdx: idx });
      })
      .orderBy(order_by)
      .skip(take * (page - 1) || 0)
      .take(take || 10)
      .getManyAndCount();

    const review_idxs = map(results, (o) => o.idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(
        ['reviewImg'],
        review_idxs,
      );
      file_info = commonUtils.getArrayKey(
        file_info,
        ['file_foreign_idx', 'file_category'],
        true,
      );
    } catch (error) {
      console.log('후기 상세 이미지 파일 없음');
    }

    const data = new Pagination({
      results,
      total,
      page,
    });

    // 답글 기능은 별도로 추가
    // let reply = await this.reviewRepository.createQueryBuilder('review')
    // .leftJoinAndSelect('review.user', 'user')
    // .leftJoinAndSelect('review.product', 'product')
    // .where(qb => {
    //   qb.where('`review`.`status` IN (:status)', {status: isArray(where['status'])?where['status']:[where['status']]});
    //   qb.andWhere('`review`.`group` IN :group', {group: review_idxs});
    //   qb.andWhere('`review`.`depth` > :depth', {depth: depthZero});
    // })
    // .skip((take * (page - 1) || 0))
    // .take((take || 10))
    // .getMany();

    // reply = commonUtils.getArrayKey(reply, ['group'], true);

    return { data, file_info };
  }

  async adminFindAllProduct(
    options: PaginationOptions,
    search: string[],
    order: string,
  ) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);
    where['status'] = get(where, 'status', [
      unregisteredStatus,
      registrationStatus,
    ]);

    const alias = 'review';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(
      order_by,
      alias + '.createdAt',
      'DESC',
    );

    // depth 0인 후기 리스트 가져오기
    const [results, total] = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.product', 'product')
      .where(qb => {
        qb.where('`review`.`status` IN (:status)', { status: isArray(where['status']) ? where['status'] : [where['status']] })
        qb.andWhere('`review`.`depth` = :depth', { depth: depthZero })
        get(where, 'star', '') && qb.andWhere('`review`.`star` IN (:star)', { star: isArray(where['star']) ? where['star'] : [where['star']] })
        get(where, 'name', '') && qb.andWhere('`user`.`name` LIKE :name', { name: '%' + where['name'] + '%' })
        get(where, 'id', '') && qb.andWhere('`user`.`id` LIKE :id', { id: '%' + where['id'] + '%' })
        get(where, 'title', '') && qb.andWhere('`product`.`title` LIKE :title', { title: '%' + where['title'] + '%' })
        get(where, 'min_createdAt', '') && qb.andWhere('`review`.`createdAt` >= :min_createdAt', { min_createdAt: where['min_createdAt'] })
        get(where, 'max_createdAt', '') && qb.andWhere('`review`.`createdAt` <= :max_createdAt', { max_createdAt: where['max_createdAt'] })
        // qb.andWhere('`product`.`idx` = :productIdx', { productIdx: idx })
      })
      .orderBy(order_by)
      .skip(take * (page - 1) || 0)
      .take(take || 10)
      .getManyAndCount();

    const review_idxs = map(results, (o) => o.idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(
        ['reviewImg'],
        review_idxs,
      );
      file_info = commonUtils.getArrayKey(
        file_info,
        ['file_foreign_idx', 'file_category'],
        true,
      );
    } catch (error) {
      console.log('후기 상세 이미지 파일 없음');
    }

    const data = new Pagination({
      results,
      total,
      page,
    });

    return { data, file_info };
  }

  async findAllUser(
    userInfo: UsersEntity,
    options: PaginationOptions,
    search: string[],
    order: string,
  ) {
    const { take, page } = options;

    // 회원 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));

    const where = commonUtils.searchSplit(search);

    where['status'] = get(where, 'status', [registrationStatus]);

    const alias = 'review';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(
      order_by,
      alias + '.createdAt',
      'DESC',
    );

    // depth 0인 후기 리스트 가져오기
    const [results, total] = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.product', 'product')
      .where((qb) => {
        qb.where('`review`.`status` IN (:status)', {
          status: isArray(where['status'])
            ? where['status']
            : [where['status']],
        });
        qb.andWhere('`review`.`depth` = :depth', { depth: depthZero });
        qb.andWhere('`user`.`idx` = :userIdx', { userIdx: user['idx'] });
      })
      .orderBy(order_by)
      .skip(take * (page - 1) || 0)
      .take(take || 10)
      .getManyAndCount();

    const review_idxs = map(results, (o) => o.idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(
        ['reviewImg'],
        review_idxs,
      );
      file_info = commonUtils.getArrayKey(
        file_info,
        ['file_foreign_idx', 'file_category'],
        true,
      );
    } catch (error) {
      console.log('후기 상세 이미지 파일 없음');
    }

    const data = new Pagination({
      results,
      total,
      page,
    });

    // 답글 기능은 별도로 추가
    // let reply = await this.reviewRepository.createQueryBuilder('review')
    // .leftJoinAndSelect('review.user', 'user')
    // .leftJoinAndSelect('review.product', 'product')
    // .where(qb => {
    //   qb.where('`review`.`status` IN (:status)', {status: isArray(where['status'])?where['status']:[where['status']]});
    //   qb.andWhere('`review`.`group` IN :group', {group: review_idxs});
    //   qb.andWhere('`review`.`depth` > :depth', {depth: depthZero});
    // })
    // .skip((take * (page - 1) || 0))
    // .take((take || 10))
    // .getMany();

    // reply = commonUtils.getArrayKey(reply, ['group'], true);

    return { data, file_info };
  }

  async averageStar(review: ReviewEntity) {
    // 등록상태 && 해당 숙소의 평점 가져오기
    const star_data = await this.reviewRepository
      .createQueryBuilder('review')
      .select('SUM(`review`.`star`)', 'total_star')
      .addSelect('COUNT(`review`.`idx`)', 'review_cnt')
      .leftJoin('review.product', 'product')
      .leftJoin('review.user', 'user')
      .where((qb) => {
        qb.where('`review`.`status` = :status', { status: registrationStatus });
        qb.andWhere('`product`.`idx` = :productIdx', {
          productIdx: review['product']['idx'],
        });
      })
      .execute();
    console.log({ star_data });
    const average_star =
      star_data[0].review_cnt != 0
        ? (star_data[0].total_star / star_data[0].review_cnt).toFixed(1)
        : 0;
    const reviews_cnt = star_data[0].review_cnt;

    await this.productService.updateAverageStar(review['product']['idx'], {
      star: +average_star,
      reviewCount: +reviews_cnt,
    });
  }

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException(
        'reviews.service.findOneIdx: 잘못된 정보 입니다.',
      );
    }
    const review = await this.reviewRepository.findOne({
      where: { idx: idx },
      relations: ['product', 'user'],
    });
    if (!get(review, 'idx', '')) {
      throw new NotFoundException(
        'reviews.service.findOneIdx: 정보를 찾을 수 없습니다.',
      );
    }
    return review;
  }

  async findOne(idx: number) {
    const review = await this.findOneIdx(idx);

    if (review['status'] == deleteStatus) {
      throw new NotFoundException(
        'reviews.service.findOne: 삭제된 후기 입니다.',
      );
    }
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(
        ['reviewImg'],
        [review['idx']],
      );
      file_info = commonUtils.getArrayKey(
        file_info,
        ['file_foreign_idx', 'file_category'],
        true,
      );
    } catch (error) {
      console.log('후기 상세 이미지 파일 없음');
    }
    return { review, file_info };
  }

  async update(
    idx: number,
    userInfo: UsersEntity,
    updateReviewDto: UpdateReviewDto,
    files,
  ) {
    const prevReview = await this.findOneIdx(idx);

    // 회원 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));
    if (!commonUtils.isAdmin(user['group']['id'])) {
      // 일반 사용자인 경우 자신의 후기 글인지 체크
      if (prevReview['user']['idx'] != user['idx']) {
        throw new UnauthorizedException(
          'reviews.service.update: 권한이 없습니다.',
        );
      }
    }

    // 변경된 내용 저장
    if (get(updateReviewDto, 'status', ''))
      prevReview['status'] = get(updateReviewDto, 'status');
    if (get(updateReviewDto, 'star', ''))
      prevReview['star'] = get(updateReviewDto, 'star');
    if (get(updateReviewDto, 'contents', ''))
      prevReview['contents'] = get(updateReviewDto, 'contents');
    if (get(updateReviewDto, 'start', ''))
      prevReview['start'] = get(updateReviewDto, 'start');
    if (get(updateReviewDto, 'end', ''))
      prevReview['end'] = get(updateReviewDto, 'end');
    const review = await this.reviewRepository.save(prevReview);

    // 숙소 평균 평점 계산
    await this.averageStar(review);

    // 유지 안하는 이전파일 제거
    await this.fileService.removeByRequest(updateReviewDto, review['idx'], [
      'reviewImg',
    ]);

    // 새 첨부파일 등록
    await this.fileService.createByRequest(files, review['idx']);

    // 파일 정보 가져오기
    let file_info;
    try {
      file_info = await this.fileService.findCategory(
        ['reviewImg'],
        '' + review['idx'],
      );
    } catch (error) {
      console.log(error['response']['message']);
    }

    return { review, file_info };
  }

  async starChange(idxs: [], star: string) {
    if (idxs.length <= 0 || !star) {
      throw new NotFoundException(
        'review.service.starChange: 변경할 정보가 없습니다.',
      );
    }

    const reivews = await this.findAllIdxs(idxs);
    if (reivews.length <= 0) {
      throw new NotFoundException(
        'review.service.starChange: 변경할 정보가 없습니다.',
      );
    }

    await this.reviewRepository
      .createQueryBuilder()
      .update()
      .set({ star: +star })
      .where('idx IN (:idxs)', { idxs: idxs })
      .execute();

    // 숙소 평균 평점 계산
    for (const key in reivews) {
      await this.averageStar(reivews[key]);
    }
  }

  async statusChange(idxs: [], status: string) {
    if (idxs.length <= 0 || !status) {
      throw new NotFoundException(
        'review.service.statusChange: 변경할 정보가 없습니다.',
      );
    }

    const reivews = await this.findAllIdxs(idxs);
    if (reivews.length <= 0) {
      throw new NotFoundException(
        'review.service.statusChange: 변경할 정보가 없습니다.',
      );
    }

    await this.reviewRepository
      .createQueryBuilder()
      .update()
      .set({ status: +status })
      .where('idx IN (:idxs)', { idxs: idxs })
      .execute();

    // 숙소 평균 평점 계산
    for (const key in reivews) {
      await this.averageStar(reivews[key]);
    }
  }

  async remove(idxs: [], userInfo: UsersEntity) {
    if (idxs.length <= 0) {
      throw new NotFoundException(
        'review.service.statusUpdate: 삭제할 정보가 없습니다.',
      );
    }

    // 회원 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));
    // 후기 정보 가져오기
    const reivews = await this.findAllIdxs(idxs);
    if (!commonUtils.isAdmin(user['group']['id'])) {
      // 일반 사용자인 경우 후기 한개씩만 삭제 가능
      if (idxs.length > 1 || reivews.length > 1) {
        throw new UnprocessableEntityException(
          'review.service.statusUpdate: 삭제할 수 없습니다.',
        );
      }
      // 일반 사용자인 경우 자신의 후기 글인지 체크
      if (reivews[0]['user']['idx'] != user['idx']) {
        throw new UnauthorizedException(
          'review.service.statusUpdate: 권한이 없습니다.',
        );
      }
    }

    await this.statusChange(idxs, '' + deleteStatus);
  }

  // 리뷰 목록 엑셀 생성
  async createExcel(
    options: PaginationOptions,
    search: string[],
    order: string,
  ) {
    const reviews = await this.adminFindAllProduct(options, search, order);
    if (!reviews) {
      throw new NotFoundException(
        'review.service.excel: 다운로드할 데이터가 없습니다.',
      );
    }

    return this.excelService.createExcel(reviews['data'], {
      type: 'review',
    });
  }
}
