import { UserLeaveService } from './user-leave.service';
import { CreateUserLeaveDto } from './dto/create-user-leave.dto';
import { UpdateUserLeaveDto } from './dto/update-user-leave.dto';
export declare class UserLeaveController {
    private readonly userLeaveService;
    constructor(userLeaveService: UserLeaveService);
    create(createUserLeaveDto: CreateUserLeaveDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserLeaveDto: UpdateUserLeaveDto): string;
    remove(id: string): string;
}
