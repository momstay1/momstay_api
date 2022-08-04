import { AdminUsersService } from 'src/admin-users/admin-users.service';
import { UsersService } from 'src/users/users.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
export declare class DashboardService {
    private readonly adminService;
    private readonly usersService;
    constructor(adminService: AdminUsersService, usersService: UsersService);
    create(createDashboardDto: CreateDashboardDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDashboardDto: UpdateDashboardDto): string;
    remove(id: number): string;
    usersCount(user: any): Promise<{
        total_cnt: number;
        admin_cnt: number;
        users_cnt: number;
    }>;
}
