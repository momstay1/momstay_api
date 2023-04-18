import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDormantDto } from './dto/create-user-dormant.dto';
import { UpdateUserDormantDto } from './dto/update-user-dormant.dto';
import { UserDormantEntity } from './entities/user-dormant.entity';
export declare class UserDormantService {
    private userDormantRepository;
    constructor(userDormantRepository: Repository<UserDormantEntity>);
    create(createUserDormantDto: CreateUserDormantDto): string;
    findAll(options: PaginationOptions, search: string[], order: string): Promise<{
        data: Pagination<UserDormantEntity>;
    }>;
    findOneId(id: string): Promise<UserDormantEntity>;
    update(id: number, updateUserDormantDto: UpdateUserDormantDto): string;
    remove(idx: number): Promise<void>;
    dormantUser(user: UsersEntity): Promise<UserDormantEntity>;
}
