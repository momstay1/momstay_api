import { BoardContentsService } from './board-contents.service';
import { BoardContentsEntity } from './entities/board-content.entity';
export declare class NoticeContentsController {
    private readonly boardContentsService;
    constructor(boardContentsService: BoardContentsService);
    sanitizeBoardContent: (bc: any) => any[];
    findCategoryAll(bd_idx: string, category: string): Promise<BoardContentsEntity[]>;
}
