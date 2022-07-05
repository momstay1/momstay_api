import { BoardsEntity } from 'src/boards/entities/board.entity';
export declare class BoardCategoriesEntity {
    bcat_idx: number;
    bcat_id: string;
    bcat_bd_idx: number;
    bcat_status: number;
    bcat_title: string;
    bcat_content: string;
    bcat_createdAt: Date;
    bcat_updatedAt: Date;
    board: BoardsEntity;
    bscats: undefined;
}
