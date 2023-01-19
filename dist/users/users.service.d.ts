import { EmailService } from 'src/email/email.service';
import { FileService } from 'src/file/file.service';
import { GroupsService } from 'src/groups/groups.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UserSnsService } from 'src/user-sns/user-sns.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    private readonly groupService;
    private readonly userSnsService;
    private readonly fileService;
    private readonly emailService;
    constructor(usersRepository: Repository<UsersEntity>, groupService: GroupsService, userSnsService: UserSnsService, fileService: FileService, emailService: EmailService);
    test(id: any): Promise<any>;
    email(email: string): Promise<void>;
    emailChk(email: string, code: string): Promise<void>;
    create(createUserDto: CreateUserDto, files: any): Promise<{
        user: UsersEntity;
        file_info: {};
    }>;
    findAll(user: any, options: PaginationOptions, search: string[]): Promise<Pagination<UsersEntity>>;
    count(): Promise<number>;
    findOne(obj: object): Promise<UsersEntity | undefined>;
    findId(id: string): Promise<UsersEntity | undefined>;
    fineUser(id: string): Promise<UsersEntity | undefined>;
    findIdx(idx: number): Promise<UsersEntity | undefined>;
    update(id: string, updateUserDto: UpdateUserDto, files: any): Promise<UsersEntity>;
    remove(id: string): Promise<void>;
    removes(ids: any): Promise<void>;
    getPrivateColumn(): string[];
    private saveUser;
    private checkUserExists;
}
