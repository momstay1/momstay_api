import { UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';
import { AdminUsersEntity } from './entities/admin-user.entity';
export declare class AdminUsersService {
    private adminRepository;
    constructor(adminRepository: Repository<AdminUsersEntity>);
    getPrivateColumn(): string[];
    getAdminPrivateColumn(): string[];
    create(createUserDto: CreateUserDto): Promise<AdminUsersEntity | UnprocessableEntityException>;
    findOne(id: string): Promise<AdminUsersEntity | undefined>;
    private checkAdminExists;
    private saveAdmin;
}
