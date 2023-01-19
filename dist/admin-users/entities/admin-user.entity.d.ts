export declare class AdminUsersEntity {
    admin_idx: number;
    admin_status: number;
    admin_type: string;
    admin_id: string;
    admin_name: string;
    admin_email: string;
    admin_phone: string;
    admin_password: string;
    setPassword(password: string): Promise<void>;
    admin_memo: string;
    admin_createdAt: Date;
    admin_updatedAt: Date;
}
