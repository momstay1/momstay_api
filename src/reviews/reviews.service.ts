import { Injectable } from '@nestjs/common';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isEmpty, map, reduce, union } from 'lodash';
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
    await this.averageStar(review['idx']);
    
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

  async averageStar(idx: number) {
    const review = await this.findOneIdx(idx);
    
    const reviews_cnt = review['product']['reviewCount'];
    const star = review['product']['star'];
    const total_star = (reviews_cnt * star).toFixed();
    const current_reviews_cnt = reviews_cnt + 1;
    const current_total_star = +total_star + review['star'];
    const average_star = (current_total_star/current_reviews_cnt).toFixed(1);

    // console.log({reviews_cnt});
    // console.log({star});
    // console.log({total_star});
    // console.log({current_reviews_cnt});
    // console.log({current_total_star});
    // console.log({average_star});

    await this.productService.updateAverageStar(review['product']['idx'], {
      star: +average_star,
      reviewCount: current_reviews_cnt
    });
  }

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const review = await this.reviewRepository.findOne({
      where: {idx: idx},
      relations: ['product']
    });
    if (!get(review, 'idx', '')) {
      throw new NotFoundException('정보를 찾을 수 없습니다.');
    }
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
