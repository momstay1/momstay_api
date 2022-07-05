import { UnprocessableEntityException } from '@nestjs/common';
import { GroupsService } from 'src/groups/groups.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    private readonly groupService;
    constructor(usersRepository: Repository<UsersEntity>, groupService: GroupsService);
    create(createUserDto: CreateUserDto): Promise<UsersEntity | UnprocessableEntityException>;
    findAll(options: PaginationOptions): Promise<Pagination<UsersEntity>>;
    findOne(id: string): Promise<UsersEntity | undefined>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UsersEntity>;
    remove(id: string): Promise<void>;
    removes(ids: []): Promise<void>;
    getPrivateColumn(): string[];
    private saveUser;
    private checkUserExists;
}
