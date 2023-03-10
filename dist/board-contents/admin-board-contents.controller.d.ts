import { AdminUsersEntity } from 'src/admin-users/entities/admin-user.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
import { BoardContentsService } from './board-contents.service';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { UpdateBoardContentDto } from './dto/update-board-content.dto';
import { BoardContentsEntity } from './entities/board-content.entity';
export declare class AdminBoardContentsController {
    private readonly boardContentsService;
    constructor(boardContentsService: BoardContentsService);
    sanitizeBoardContent: (bc: any) => any[];
    create(user: UsersEntity, createBoardContentDto: CreateBoardContentDto): Promise<any>;
    statusChange(statusChange: any): Promise<void>;
    typeChange(statusChange: any): Promise<void>;
    findCategoryAll(bd_idx: string, category: string, take: number, page: number, order: string): Promise<{
        results: BoardContentsEntity[];
        pageTotal: number;
        total: number;
        page: number;
        bcats: import("../board-categories/entities/board-categories.entity").BoardCategoriesEntity[];
    }>;
    findOne(bd_idx: number, bc_idx: number): Promise<BoardContentsEntity>;
    update(user: AdminUsersEntity, bc_idx: number, updateBoardContentDto: UpdateBoardContentDto): Promise<any>;
}
