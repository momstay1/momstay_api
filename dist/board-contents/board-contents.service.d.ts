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
    create(user_id: any, createBoardContentDto: CreateBoardContentDto): Promise<any>;
    findAll(options: PaginationOptions): Promise<Pagination<BoardContentsEntity>>;
    findNoticeAll(): Promise<BoardContentsEntity[]>;
    findCategoryAll(options: PaginationOptions, category: string): Promise<{
        bcats: import("../board-categories/entities/board-categories.entity").BoardCategoriesEntity[];
        bc: Pagination<BoardContentsEntity>;
    }>;
    findNoticeCategoryAll(category: string): Promise<BoardContentsEntity[]>;
    findOne(idx: number): Promise<BoardContentsEntity>;
    update(id: number, updateBoardContentDto: UpdateBoardContentDto): string;
    remove(id: number): string;
    private saveBoardContent;
    getPrivateColumn(): any[];
    getNoneNoticeType(): number[];
}
