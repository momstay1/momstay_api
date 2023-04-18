/// <reference types="multer" />
import { AuthService } from 'src/auth/auth.service';
import { ResponseAuthDto } from 'src/auth/dto/response-auth.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UsersEntity } from './entities/user.entity';
export declare class AdminUsersController {
    private authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    create(createAdminUserDto: CreateAdminUserDto, files: Array<Express.Multer.File>): Promise<{
        user: UsersEntity;
        file_info: any;
    }>;
    login(user: UsersEntity): Promise<ResponseAuthDto>;
    findAll(user: UsersEntity, take: number, page: number, search: string[], order: string): Promise<{
        results: UsersEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    excelDownload(user: UsersEntity, take: number, page: number, search: string[], order: string, res: any): Promise<void>;
    findIdx(idx: string): Promise<UsersEntity>;
    findId(id: string): Promise<UsersEntity>;
    update(id: string, updateUserDto: UpdateUserDto, files: Array<Express.Multer.File>): Promise<{
        user: UsersEntity;
        file_info: any;
    }>;
    remove(user_ids: any): Promise<void>;
}
