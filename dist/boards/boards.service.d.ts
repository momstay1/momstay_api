import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsEntity } from './entities/board.entity';
export declare class BoardsService {
    private boardRepository;
    constructor(boardRepository: Repository<BoardsEntity>);
    create(createBoardDto: CreateBoardDto): string;
    findAll(): Promise<BoardsEntity[]>;
    findOne(id: string): Promise<BoardsEntity | undefined>;
    update(id: number, updateBoardDto: UpdateBoardDto): string;
    remove(id: number): string;
    findBoard(where: any): Promise<BoardsEntity | undefined>;
    getPrivateColumn(): any[];
}
