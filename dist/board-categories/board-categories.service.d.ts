import { Repository } from 'typeorm';
import { BoardCategoriesEntity } from './entities/board-categories.entity';
export declare class BoardCategoriesService {
    private bcatRepository;
    constructor(bcatRepository: Repository<BoardCategoriesEntity>);
    findOne(idx: number): Promise<BoardCategoriesEntity | undefined>;
    searching(sqlQuery: any): Promise<BoardCategoriesEntity[]>;
    findAll(): Promise<BoardCategoriesEntity[]>;
}
