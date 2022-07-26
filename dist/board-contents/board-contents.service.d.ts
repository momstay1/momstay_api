import { BoardCategoriesService } from 'src/board-categories/board-categories.service';
import { BoardSelectedCategoriesService } from 'src/board-selected-categories/board-selected-categories.service';
import { BoardsService } from 'src/boards/boards.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { UpdateBoardContentDto } from './dto/update-board-content.dto';
import { BoardContentsEntity } from './entities/board-content.entity';
import { Pagination, PaginationOptions } from 'src/paginate';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
export declare class BoardContentsService {
    private bcRepository;
    private readonly usersService;
    private readonly boardsService;
    private readonly bscatsService;
    private readonly bcatsService;
    private readonly AdminService;
    constructor(bcRepository: Repository<BoardContentsEntity>, usersService: UsersService, boardsService: BoardsService, bscatsService: BoardSelectedCategoriesService, bcatsService: BoardCategoriesService, AdminService: AdminUsersService);
    create(userInfo: any, bc: CreateBoardContentDto): Promise<any>;
    statusChange(statusChange: any): Promise<void>;
    findCategoryAll(idx: any, category: string, options: PaginationOptions): Promise<{
        bcats: import("../board-categories/entities/board-categories.entity").BoardCategoriesEntity[];
        bc: Pagination<BoardContentsEntity>;
    }>;
    findNoticeCategoryAll(bd_idx: string, category: string): Promise<BoardContentsEntity[]>;
    findOne(bc_idx: number): Promise<BoardContentsEntity>;
    findIndex(idx: number): Promise<BoardContentsEntity>;
    findBdBcIndex(bd_idx: number, bc_idx: number): Promise<BoardContentsEntity>;
    update(userInfo: any, bc_idx: number, updateBoardContentDto: UpdateBoardContentDto): Promise<any>;
    adminFindCategoryAll(idx: any, category: string, options: PaginationOptions): Promise<{
        bcats: import("../board-categories/entities/board-categories.entity").BoardCategoriesEntity[];
        bc: Pagination<BoardContentsEntity>;
    }>;
    private bscatsChange;
    private saveBoardContent;
    private updateBoardContent;
    getPrivateColumn(): any[];
    getNoneNoticeType(): number[];
}
