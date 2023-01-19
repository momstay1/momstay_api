/// <reference types="multer" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { ResponseAuthDto } from 'src/auth/dto/response-auth.dto';
import { UsersEntity } from './entities/user.entity';
import { SnsLoginUserDto } from './dto/sns.login-user.dto';
import { LoginService } from 'src/login/login.service';
export declare class UsersController {
    private authService;
    private readonly usersService;
    private readonly loginService;
    constructor(authService: AuthService, usersService: UsersService, loginService: LoginService);
    create(createUserDto: CreateUserDto, files: Array<Express.Multer.File>): Promise<{
        user: UsersEntity;
        file_info: {};
    }>;
    login(user: UsersEntity, req: any): Promise<ResponseAuthDto>;
    snsLogin(snsLoginUserDto: SnsLoginUserDto): Promise<ResponseAuthDto>;
    emailChk(email: string, code: string): Promise<void>;
    getProfile(user: UsersEntity): Promise<UsersEntity>;
    getUniqueKey(uniquekey: string): Promise<UsersEntity>;
    loginChk(id: string): Promise<UsersEntity>;
    email(email: string): Promise<void>;
    test(id: string): Promise<any>;
}
