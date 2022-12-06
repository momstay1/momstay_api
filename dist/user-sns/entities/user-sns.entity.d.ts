import { UsersEntity } from 'src/users/entities/user.entity';
export declare class UserSnsEntity {
    idx: number;
    id: string;
    status: number;
    type: string;
    info: string;
    createdAt: Date;
    updatedAt: Date;
    user: UsersEntity;
}
