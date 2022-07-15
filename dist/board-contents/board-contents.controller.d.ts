import { UsersEntity } from 'src/users/entities/user.entity';
import { BoardContentsService } from './board-contents.service';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { UpdateBoardContentDto } from './dto/update-board-content.dto';
export declare class BoardContentsController {
    private readonly boardContentsService;
    constructor(boardContentsService: BoardContentsService);
    sanitizeBoardContent: (bc: any) => any[];
    create(user: UsersEntity, createBoardContentDto: CreateBoardContentDto): Promise<any>;
    findCategoryAll(bd_idx: string, category: string, take: number, page: number): Promise<{
        bcats: import("../board-categories/entities/board-categories.entity").BoardCategoriesEntity[];
        results: any[][];
        total: number;
        pageTotal: number;
    }>;
    findOne(bd_idx: number, bc_idx: number): Promise<any[]>;
    update(user: UsersEntity, bc_idx: string, updateBoardContentDto: UpdateBoardContentDto): Promise<any[]>;
}
