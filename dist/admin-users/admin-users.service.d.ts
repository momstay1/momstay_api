import { UnprocessableEntityException } from '@nestjs/common';
import { GroupsService } from 'src/groups/groups.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Repository } from 'typeorm';
import { AdminUsersEntity } from './entities/admin-user.entity';
export declare class AdminUsersService {
    private adminRepository;
    private readonly groupService;
    constructor(adminRepository: Repository<AdminUsersEntity>, groupService: GroupsService);
    getPrivateColumn(): string[];
    getAdminPrivateColumn(): string[];
    create(createUserDto: CreateUserDto): Promise<AdminUsersEntity | UnprocessableEntityException>;
    findAll(admin: any, options: PaginationOptions): Promise<Pagination<AdminUsersEntity>>;
    findOne(id: string): Promise<AdminUsersEntity | undefined>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<AdminUsersEntity>;
    count(user: any): Promise<number>;
    removes(admin_ids: any): Promise<void>;
    private checkAdminExists;
    private saveAdmin;
}
