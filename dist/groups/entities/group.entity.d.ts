import { UsersEntity } from "src/users/entities/user.entity";
export declare class GroupsEntity {
    idx: number;
    type: string;
    status: string;
    id: string;
    name: string;
    memo: string;
    users: UsersEntity[];
}
