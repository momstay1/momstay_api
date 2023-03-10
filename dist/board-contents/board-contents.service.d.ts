import { BoardCategoriesService } from 'src/board-categories/board-categories.service';
import { BoardSelectedCategoriesService } from 'src/board-selected-categories/board-selected-categories.service';
import { BoardsService } from 'src/boards/boards.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { UpdateBoardContentDto } from './dto/update-board-content.dto';
import { BoardContentsEntity } from './entities/board-content.entity';
import { Pagination, PaginationOptions } from 'src/paginate';
export declare class BoardContentsService {
    private bcRepository;
    private readonly usersService;
    private readonly boardsService;
    private readonly bscatsService;
    private readonly bcatsService;
    constructor(bcRepository: Repository<BoardContentsEntity>, usersService: UsersService, boardsService: BoardsService, bscatsService: BoardSelectedCategoriesService, bcatsService: BoardCategoriesService);
    create(userInfo: any, bc: CreateBoardContentDto): Promise<any>;
    statusChange(statusChange: any): Promise<void>;
    statusAnswer(bcIdx: number): Promise<void>;
    commentCountUp(bcIdx: number): Promise<void>;
    typeChange(typeChange: any): Promise<void>;
    findCategoryAll(bd_idx: any, category: string, options: PaginationOptions, order: any, search: string[]): Promise<{
        bcats: import("../board-categories/entities/board-categories.entity").BoardCategoriesEntity[];
        bc: Pagination<BoardContentsEntity>;
    }>;
    findUserCategoryAll(bd_idx: any, category: string, options: PaginationOptions, order: any, userInfo: any): Promise<{
        bcats: import("../board-categories/entities/board-categories.entity").BoardCategoriesEntity[];
        bc: Pagination<BoardContentsEntity>;
    }>;
    findNoticeCategoryAll(bd_idx: string, category: string): Promise<BoardContentsEntity[]>;
    findOne(bcIdx: number): Promise<BoardContentsEntity>;
    findIndex(idx: number): Promise<BoardContentsEntity>;
    findBdBcIndex(bcIdx: number): Promise<BoardContentsEntity>;
    update(userInfo: any, bcIdx: number, updateBoardContentDto: UpdateBoardContentDto): Promise<any>;
    countUp(bc_idx: any, bc_count: number): Promise<number>;
    adminFindCategoryAll(bd_idx: any, category: string, options: PaginationOptions, order: any): Promise<{
        bcats: import("../board-categories/entities/board-categories.entity").BoardCategoriesEntity[];
        bc: Pagination<BoardContentsEntity>;
    }>;
    private bscatsChange;
    private saveBoardContent;
    private updateBoardContent;
    getPrivateColumn(): any[];
    getNoneNoticeType(): number[];
}
