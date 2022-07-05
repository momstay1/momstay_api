import { BoardContentsService } from './board-contents.service';
export declare class NoticeContentsController {
    private readonly boardContentsService;
    constructor(boardContentsService: BoardContentsService);
    sanitizeBoardContent: (bc: any) => any[];
    findAll(): Promise<any[][]>;
    findCategoryAll(category: string): Promise<any[][]>;
}
