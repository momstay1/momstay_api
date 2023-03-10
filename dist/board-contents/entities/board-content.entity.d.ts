import { BoardSelectedCategoriesEntity } from 'src/board-selected-categories/entities/board-selected-categories.entity';
import { BoardsEntity } from 'src/boards/entities/board.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class BoardContentsEntity {
    idx: number;
    status: number;
    type: number;
    writer: string;
    title: string;
    linkStatus: string;
    link: string;
    content: string;
    setPassword(password: string): Promise<void>;
    password: string;
    commentCount: number;
    count: number;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    user: UsersEntity;
    board: BoardsEntity;
    bscats: BoardSelectedCategoriesEntity;
}
