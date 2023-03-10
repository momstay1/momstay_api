import { MypageService } from './mypage.service';
import { CreateMypageDto } from './dto/create-mypage.dto';
import { UpdateMypageDto } from './dto/update-mypage.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
import { BoardContentsEntity } from 'src/board-contents/entities/board-content.entity';
import { BoardContentsService } from 'src/board-contents/board-contents.service';
import { ReviewsService } from 'src/reviews/reviews.service';
export declare class MypageController {
    private readonly mypageService;
    private readonly boardContentsService;
    private readonly reviewsService;
    constructor(mypageService: MypageService, boardContentsService: BoardContentsService, reviewsService: ReviewsService);
    create(createMypageDto: CreateMypageDto): string;
    findAll(): string;
    findUserCategoryAll(user: UsersEntity, bd_idx: string, category: string, take: number, page: number, order: string): Promise<{
        results: BoardContentsEntity[];
        pageTotal: number;
        total: number;
        page: number;
        bcats: import("../board-categories/entities/board-categories.entity").BoardCategoriesEntity[];
    }>;
    findAllUser(user: UsersEntity, take: number, page: number, search: string[], order: string): Promise<{
        file_info: {};
        results: import("../reviews/entities/review.entity").ReviewEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    findOne(id: string): string;
    update(id: string, updateMypageDto: UpdateMypageDto): string;
    remove(id: string): string;
}
