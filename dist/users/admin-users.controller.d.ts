/// <reference types="multer" />
import { AuthService } from 'src/auth/auth.service';
import { ResponseAuthDto } from 'src/auth/dto/response-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from './entities/user.entity';
export declare class AdminUsersController {
    private authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    create(createUserDto: CreateUserDto, files: Array<Express.Multer.File>): Promise<{
        user: UsersEntity;
        file_info: any;
    }>;
    login(user: UsersEntity): Promise<ResponseAuthDto>;
    findAll(user: UsersEntity, take: number, page: number, search: string[]): Promise<{
        results: UsersEntity[];
        total: number;
        pageTotal: number;
    }>;
    findId(id: string): Promise<UsersEntity>;
    update(id: string, updateUserDto: UpdateUserDto, files: Array<Express.Multer.File>): Promise<UsersEntity>;
    remove(user_ids: any): Promise<void>;
}
