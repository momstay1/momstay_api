import { BoardCategoriesService } from 'src/board-categories/board-categories.service';
import { Repository } from 'typeorm';
import { BoardSelectedCategoriesEntity } from './entities/board-selected-categories.entity';
export declare class BoardSelectedCategoriesService {
    private bscatsRepository;
    private readonly bcatsService;
    constructor(bscatsRepository: Repository<BoardSelectedCategoriesEntity>, bcatsService: BoardCategoriesService);
    create(createbscatContentDto: BoardSelectedCategoriesEntity): Promise<BoardSelectedCategoriesEntity>;
    saveToBscat(bcat: any, boardContent: any): Promise<BoardSelectedCategoriesEntity>;
    removes(idxs: any): Promise<void>;
}
