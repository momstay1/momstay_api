import { UsersEntity } from "src/users/entities/user.entity";
export declare class BlockEntity {
    idx: number;
    blockUserIdx: number;
    user: UsersEntity;
    createdAt: Date;
    updatedAt: Date;
}
