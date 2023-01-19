import { UserDormantService } from './user-dormant.service';
import { CreateUserDormantDto } from './dto/create-user-dormant.dto';
import { UpdateUserDormantDto } from './dto/update-user-dormant.dto';
export declare class UserDormantController {
    private readonly userDormantService;
    constructor(userDormantService: UserDormantService);
    create(createUserDormantDto: CreateUserDormantDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDormantDto: UpdateUserDormantDto): string;
    remove(id: string): string;
}
