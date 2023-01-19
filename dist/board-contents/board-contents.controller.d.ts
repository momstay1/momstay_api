import { UsersEntity } from 'src/users/entities/user.entity';
import { BoardContentsService } from './board-contents.service';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { UpdateBoardContentDto } from './dto/update-board-content.dto';
import { BoardContentsEntity } from './entities/board-content.entity';
export declare class BoardContentsController {
    private readonly boardContentsService;
    constructor(boardContentsService: BoardContentsService);
    sanitizeBoardContent: (bc: any) => any[];
    create(user: UsersEntity, createBoardContentDto: CreateBoardContentDto): Promise<any>;
    findCategoryAll(bd_idx: string, category: string, take: number, page: number, order: string): Promise<{
        bcats: import("../board-categories/entities/board-categories.entity").BoardCategoriesEntity[];
        total: number;
        pageTotal: number;
        results: BoardContentsEntity[];
    }>;
    findOne(bd_idx: number, bc_idx: number): Promise<BoardContentsEntity>;
    update(user: UsersEntity, bc_idx: string, updateBoardContentDto: UpdateBoardContentDto): Promise<any[]>;
}
