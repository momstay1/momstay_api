import { BoardsService } from './boards.service';
export declare class BoardsController {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    findAll(): Promise<import("./entities/board.entity").BoardsEntity[]>;
    findOne(id: string): Promise<import("./entities/board.entity").BoardsEntity>;
}
