import { CreateUserLeaveDto } from './dto/create-user-leave.dto';
import { UpdateUserLeaveDto } from './dto/update-user-leave.dto';
export declare class UserLeaveService {
    create(createUserLeaveDto: CreateUserLeaveDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserLeaveDto: UpdateUserLeaveDto): string;
    remove(id: number): string;
}
