import { UsersEntity } from "src/users/entities/user.entity";
export declare class CommentEntity {
    idx: number;
    status: number;
    parentIdx: number;
    category: string;
    foreignIdx: number;
    contents: string;
    name: string;
    setPassword(password: string): Promise<void>;
    password: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    user: UsersEntity;
}
