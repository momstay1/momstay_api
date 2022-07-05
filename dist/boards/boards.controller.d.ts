import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
export declare class BoardsController {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    create(createBoardDto: CreateBoardDto): string;
    findAll(): string;
    findOne(id: string): Promise<import("./entities/board.entity").BoardsEntity>;
    update(id: string, updateBoardDto: UpdateBoardDto): string;
    remove(id: string): string;
}
