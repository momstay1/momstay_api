import { UnprocessableEntityException } from '@nestjs/common';
import { GroupsService } from 'src/groups/groups.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
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
    count(user: any): Promise<number>;
    private checkAdminExists;
    private saveAdmin;
}
