import { BoardsService } from './boards.service';
export declare class BoardsController {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    sanitizeBoard: (bc: any) => any[];
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any[]>;
}
