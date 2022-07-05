import { AdminUsersEntity } from 'src/admin-users/entities/admin-user.entity';
import { BoardSelectedCategoriesEntity } from 'src/board-selected-categories/entities/board-selected-categories.entity';
import { BoardsEntity } from 'src/boards/entities/board.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class BoardContentsEntity {
    bc_idx: number;
    bc_bd_idx: number;
    bc_user_idx: number;
    bc_status: number;
    bc_type: number;
    bc_write_name: string;
    bc_title: string;
    bc_link: string;
    bc_content: string;
    bc_password: string;
    setPassword(password: string): Promise<void>;
    bc_count: number;
    bc_order: number;
    bc_createdAt: Date;
    bc_updatedAt: Date;
    user: UsersEntity;
    admin: AdminUsersEntity;
    board: BoardsEntity;
    bscats: BoardSelectedCategoriesEntity;
}
