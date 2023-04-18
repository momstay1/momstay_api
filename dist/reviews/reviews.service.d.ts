import { FileService } from 'src/file/file.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { ProductService } from 'src/product/product.service';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './entities/review.entity';
import { ExcelService } from 'src/excel/excel.service';
export declare class ReviewsService {
    private reviewRepository;
    private readonly productService;
    private readonly userService;
    private readonly fileService;
    private readonly excelService;
    constructor(reviewRepository: Repository<ReviewEntity>, productService: ProductService, userService: UsersService, fileService: FileService, excelService: ExcelService);
    create(userInfo: UsersEntity, createReviewDto: CreateReviewDto, files: any): Promise<{
        review: ReviewEntity;
        file_info: any;
    }>;
    findAll(): string;
    findAllIdxs(idxs: []): Promise<ReviewEntity[]>;
    findAllProduct(idx: number, options: PaginationOptions, search: string[], order: string): Promise<{
        data: Pagination<ReviewEntity>;
        file_info: {};
    }>;
    adminFindAllProduct(options: PaginationOptions, search: string[], order: string): Promise<{
        data: Pagination<ReviewEntity>;
        file_info: {};
    }>;
    findAllUser(userInfo: UsersEntity, options: PaginationOptions, search: string[], order: string): Promise<{
        data: Pagination<ReviewEntity>;
        file_info: {};
    }>;
    averageStar(review: ReviewEntity): Promise<void>;
    findOneIdx(idx: number): Promise<ReviewEntity>;
    findOne(idx: number): Promise<{
        review: ReviewEntity;
        file_info: {};
    }>;
    update(idx: number, userInfo: UsersEntity, updateReviewDto: UpdateReviewDto, files: any): Promise<{
        review: ReviewEntity;
        file_info: any;
    }>;
    starChange(idxs: [], star: string): Promise<void>;
    statusChange(idxs: [], status: string): Promise<void>;
    remove(idxs: [], userInfo: UsersEntity): Promise<void>;
    createExcel(options: PaginationOptions, search: string[], order: string): Promise<{
        file_name: string;
        file_path: string;
    }>;
}
