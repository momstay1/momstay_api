import { UserLeaveService } from './user-leave.service';
export declare class AdminUserLeaveController {
    private readonly userLeaveService;
    constructor(userLeaveService: UserLeaveService);
    findAll(take: number, page: number, search: string[], order: string): Promise<{
        results: import("./entities/user-leave.entity").UserLeaveEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
}
