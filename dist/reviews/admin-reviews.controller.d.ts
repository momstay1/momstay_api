/// <reference types="multer" />
import { ReviewsService } from './reviews.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class AdminReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    adminFindAllProduct(take: number, page: number, search: string[], order: string): Promise<{
        file_info: {};
        results: import("./entities/review.entity").ReviewEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    excelDownload(take: number, page: number, search: string[], order: string, res: any): Promise<void>;
    findOne(idx: string): Promise<{
        review: import("./entities/review.entity").ReviewEntity;
        file_info: {};
    }>;
    statusChange(idxs: [], status: string): Promise<void>;
    starChange(idxs: [], star: string): Promise<void>;
    update(idx: number, user: UsersEntity, updateReviewDto: UpdateReviewDto, files: Array<Express.Multer.File>): Promise<{
        review: import("./entities/review.entity").ReviewEntity;
        file_info: any;
    }>;
    remove(user: UsersEntity, idxs: []): Promise<void>;
}
