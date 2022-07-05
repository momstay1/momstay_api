import { GroupsEntity } from 'src/groups/entities/group.entity';
export declare class AdminUsersEntity {
    admin_idx: number;
    admin_status: number;
    admin_type: string;
    admin_id: string;
    admin_name: string;
    admin_email: string;
    user_phone: string;
    admin_password: string;
    setPassword(password: string): Promise<void>;
    admin_memo: string;
    board_contents: undefined;
    admin_group: GroupsEntity;
    admin_createdAt: Date;
    admin_updatedAt: Date;
}
