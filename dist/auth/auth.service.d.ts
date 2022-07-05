import { JwtService } from '@nestjs/jwt';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
import { GroupsService } from 'src/groups/groups.service';
import { UsersService } from 'src/users/users.service';
import { ResponseAuthDto } from './dto/response-auth.dto';
export declare class AuthService {
    private readonly userService;
    private readonly adminService;
    private readonly jwtService;
    private readonly groupsService;
    constructor(userService: UsersService, adminService: AdminUsersService, jwtService: JwtService, groupsService: GroupsService);
    validateUser(id: string, password: string): Promise<any>;
    login(user: any): Promise<ResponseAuthDto>;
    admin_login(id: any, password: any): Promise<ResponseAuthDto>;
}
