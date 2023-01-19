import { UsersEntity } from "src/users/entities/user.entity";
export declare class LoginEntity {
    idx: number;
    ip: string;
    agent: string;
    user: UsersEntity;
    createdAt: Date;
}
