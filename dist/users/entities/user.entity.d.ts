import { GroupsEntity } from 'src/groups/entities/group.entity';
export declare class UsersEntity {
    user_idx: number;
    user_status: number;
    user_type: string;
    user_id: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    user_password: string;
    setPassword(password: string): Promise<void>;
    user_memo: string;
    user_signupVerifyToken: string;
    user_place_idx: number;
    board_contents: undefined;
    defect: undefined;
    user_group: GroupsEntity;
    user_createdAt: Date;
    user_updatedAt: Date;
}
