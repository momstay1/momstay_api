import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserLeaveDto } from './dto/create-user-leave.dto';
import { UpdateUserLeaveDto } from './dto/update-user-leave.dto';
import { UserLeaveEntity } from './entities/user-leave.entity';
export declare class UserLeaveService {
    private userLeaveRepository;
    constructor(userLeaveRepository: Repository<UserLeaveEntity>);
    create(createUserLeaveDto: CreateUserLeaveDto): string;
    leaveUser(user: UsersEntity, reason: string): Promise<UserLeaveEntity>;
    findAll(options: PaginationOptions, search: string[], order: string): Promise<{
        data: Pagination<UserLeaveEntity>;
    }>;
    findOne(id: number): string;
    update(id: number, updateUserLeaveDto: UpdateUserLeaveDto): string;
    remove(id: number): string;
}
