import { UsersEntity } from "src/users/entities/user.entity";
export declare class MembershipHistoryEntity {
    idx: number;
    status: number;
    depositor: string;
    month: number;
    start: string;
    end: string;
    user: UsersEntity;
    createdAt: Date;
    updatedAt: Date;
}
