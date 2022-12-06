import { Repository } from 'typeorm';
import { CreateUserSnsDto } from './dto/create-user-sns.dto';
import { UpdateUserSnsDto } from './dto/update-user-sns.dto';
import { UserSnsEntity } from './entities/user-sns.entity';
export declare class UserSnsService {
    private userSnsRepository;
    constructor(userSnsRepository: Repository<UserSnsEntity>);
    create(createUserSnsDto: CreateUserSnsDto): string;
    findAll(): string;
    findAllUserIdx(user_idxs: any): Promise<UserSnsEntity[]>;
    findOne(id: number): string;
    findId(id: string): Promise<UserSnsEntity | undefined>;
    update(id: number, updateUserSnsDto: UpdateUserSnsDto): string;
    remove(id: number): string;
    saveUserSns(snsInfo: any, user: any): Promise<void>;
}
