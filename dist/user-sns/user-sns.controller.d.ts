import { UserSnsService } from './user-sns.service';
import { CreateUserSnsDto } from './dto/create-user-sns.dto';
import { UpdateUserSnsDto } from './dto/update-user-sns.dto';
export declare class UserSnsController {
    private readonly userSnsService;
    constructor(userSnsService: UserSnsService);
    create(createUserSnsDto: CreateUserSnsDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserSnsDto: UpdateUserSnsDto): string;
    remove(id: string): string;
}
