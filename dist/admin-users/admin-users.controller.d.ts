import { AuthService } from 'src/auth/auth.service';
import { ResponseAuthDto } from 'src/auth/dto/response-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { AdminUsersService } from './admin-users.service';
import { AdminUsersEntity } from './entities/admin-user.entity';
export declare class AdminUsersController {
    private authService;
    private readonly adminUsersService;
    private readonly usersService;
    constructor(authService: AuthService, adminUsersService: AdminUsersService, usersService: UsersService);
    sanitizeUsers(admin: any): any[];
    sanitizeAdmin(admin: any): any[];
    create(createUserDto: CreateUserDto): Promise<any[]>;
    login(id: string, password: string): Promise<ResponseAuthDto>;
    findAll(take: number, page: number): Promise<{
        results: any[][];
        total: number;
        pageTotal: number;
    }>;
    getProfile(user: AdminUsersEntity): Promise<any[]>;
    findId(id: string): Promise<any[]>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<any[]>;
    remove(user_ids: any): Promise<void>;
}
