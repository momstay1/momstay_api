import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { ResponseAuthDto } from 'src/auth/dto/response-auth.dto';
import { UsersEntity } from './entities/user.entity';
export declare class UsersController {
    private authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    sanitizeUsers(user: any): any[];
    create(createUserDto: CreateUserDto): Promise<any[]>;
    login(user: UsersEntity): Promise<ResponseAuthDto>;
    getProfile(user: UsersEntity): Promise<any[]>;
}