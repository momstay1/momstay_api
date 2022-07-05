import { UsersEntity } from 'src/users/entities/user.entity';
import { BoardContentsService } from './board-contents.service';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { UpdateBoardContentDto } from './dto/update-board-content.dto';
export declare class BoardContentsController {
    private readonly boardContentsService;
    constructor(boardContentsService: BoardContentsService);
    sanitizeBoardContent: (bc: any) => any[];
    create(user: UsersEntity, createBoardContentDto: CreateBoardContentDto): Promise<any>;
    findAll(take: number, page: number): Promise<{
        results: any[][];
        total: number;
        pageTotal: number;
    }>;
    findCategoryAll(take: number, page: number, category: string): Promise<{
        bcats: import("../board-categories/entities/board-categories.entity").BoardCategoriesEntity[];
        results: any[][];
        total: number;
        pageTotal: number;
    }>;
    findOne(idx: number): Promise<any[]>;
    update(id: string, updateBoardContentDto: UpdateBoardContentDto): string;
    remove(id: string): string;
}
