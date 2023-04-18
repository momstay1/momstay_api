import { Pagination, PaginationOptions } from 'src/paginate';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { FileService } from 'src/file/file.service';
import { GroupsService } from 'src/groups/groups.service';
import { UserSnsService } from 'src/user-sns/user-sns.service';
import { DeviceService } from 'src/device/device.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/user.entity';
import { UserLeaveService } from 'src/user-leave/user-leave.service';
import { UserDormantService } from 'src/user-dormant/user-dormant.service';
import { ExcelService } from 'src/excel/excel.service';
export declare class UsersService {
    private usersRepository;
    private readonly groupService;
    private readonly userSnsService;
    private readonly fileService;
    private readonly emailService;
    private readonly deviceService;
    private readonly userLeaveService;
    private readonly userDormantService;
    private readonly excelService;
    constructor(usersRepository: Repository<UsersEntity>, groupService: GroupsService, userSnsService: UserSnsService, fileService: FileService, emailService: EmailService, deviceService: DeviceService, userLeaveService: UserLeaveService, userDormantService: UserDormantService, excelService: ExcelService);
    test(id: any): Promise<any>;
    email(email: string, type: string): Promise<{
        result: {
            status: boolean;
            message: string;
            type: string;
        };
    }>;
    emailChk(email: string, code: string): Promise<void>;
    create(createUserDto: CreateUserDto, files: any): Promise<{
        user: UsersEntity;
        file_info: any;
    }>;
    findAll(user: any, options: PaginationOptions, search: string[], order: string): Promise<Pagination<UsersEntity>>;
    count(): Promise<number>;
    findOne(obj: object): Promise<UsersEntity | undefined>;
    findId(id: string): Promise<UsersEntity | undefined>;
    fineUser(id: string): Promise<UsersEntity | undefined>;
    findIdx(idx: number): Promise<UsersEntity | undefined>;
    update(id: string, updateUserDto: UpdateUserDto, files: any): Promise<{
        user: UsersEntity;
        file_info: any;
    }>;
    updateUser(token: string, userInfo: UsersEntity): Promise<{
        user: UsersEntity;
    }>;
    chpw(id: string, password: string): Promise<UsersEntity>;
    rspw(userdata: any, prevpassword: string, password: string): Promise<UsersEntity>;
    lastActivity(id: string): Promise<void>;
    leave(id: string, reason: string): Promise<void>;
    dormant(user: UsersEntity): Promise<void>;
    dormantRecovery(id: string): Promise<void>;
    removes(ids: any): Promise<void>;
    dashboard(): Promise<any>;
    getPrivateColumn(): string[];
    private saveUser;
    private checkUserExists;
    deleteUniqueKey(): Promise<void>;
    dormantUser(): Promise<void>;
    createExcel(user: any, options: PaginationOptions, search: string[], order: string): Promise<{
        file_name: string;
        file_path: string;
    }>;
}
