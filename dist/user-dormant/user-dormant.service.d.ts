import { CreateUserDormantDto } from './dto/create-user-dormant.dto';
import { UpdateUserDormantDto } from './dto/update-user-dormant.dto';
export declare class UserDormantService {
    create(createUserDormantDto: CreateUserDormantDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDormantDto: UpdateUserDormantDto): string;
    remove(id: number): string;
}
