import { BoardCategoriesService } from './board-categories.service';
export declare class BoardCategoriesController {
    private readonly boardCategoriesService;
    constructor(boardCategoriesService: BoardCategoriesService);
    findAll(): Promise<import("./entities/board-categories.entity").BoardCategoriesEntity[]>;
}
