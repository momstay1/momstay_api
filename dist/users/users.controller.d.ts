/// <reference types="multer" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { ResponseAuthDto } from 'src/auth/dto/response-auth.dto';
import { UsersEntity } from './entities/user.entity';
import { SnsLoginUserDto } from './dto/sns.login-user.dto';
import { LoginService } from 'src/login/login.service';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private authService;
    private readonly usersService;
    private readonly loginService;
    private readonly refreshTokenService;
    constructor(authService: AuthService, usersService: UsersService, loginService: LoginService, refreshTokenService: RefreshTokenService);
    create(createUserDto: CreateUserDto, files: Array<Express.Multer.File>): Promise<{
        user: UsersEntity;
        file_info: any;
    }>;
    login(user: UsersEntity, req: any): Promise<ResponseAuthDto>;
    reissued(req: any): Promise<ResponseAuthDto>;
    snsLogin(snsLoginUserDto: SnsLoginUserDto): Promise<ResponseAuthDto>;
    emailChk(email: string, code: string): Promise<void>;
    getProfile(user: UsersEntity): Promise<UsersEntity>;
    getUniqueKey(uniquekey: string): Promise<UsersEntity>;
    loginChk(id: string): Promise<UsersEntity>;
    email(email: string): Promise<void>;
    test(id: string): Promise<any>;
    changePassword(id: string, password: string): Promise<UsersEntity>;
    resettingPassword(user: UsersEntity, prevpassword: string, password: string): Promise<UsersEntity>;
    update(id: string, updateUserDto: UpdateUserDto, files: Array<Express.Multer.File>): Promise<{
        user: UsersEntity;
        file_info: any;
    }>;
}
