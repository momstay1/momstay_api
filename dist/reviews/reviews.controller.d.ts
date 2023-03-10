/// <reference types="multer" />
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(user: UsersEntity, createReviewDto: CreateReviewDto, files: Array<Express.Multer.File>): Promise<{
        review: import("./entities/review.entity").ReviewEntity;
        file_info: any;
    }>;
    test(): Promise<void>;
    findAllProduct(idx: number, take: number, page: number, search: string[], order: string): Promise<{
        file_info: {};
        results: import("./entities/review.entity").ReviewEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    findOne(idx: string): Promise<{
        review: import("./entities/review.entity").ReviewEntity;
        file_info: {};
    }>;
    update(idx: number, user: UsersEntity, updateReviewDto: UpdateReviewDto, files: Array<Express.Multer.File>): Promise<{
        review: import("./entities/review.entity").ReviewEntity;
        file_info: any;
    }>;
    statusUpdate(user: UsersEntity, idxs: []): Promise<void>;
}
