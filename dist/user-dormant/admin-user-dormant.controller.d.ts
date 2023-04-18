import { UserDormantService } from './user-dormant.service';
import { CreateUserDormantDto } from './dto/create-user-dormant.dto';
export declare class AdminUserDormantController {
    private readonly userDormantService;
    constructor(userDormantService: UserDormantService);
    create(createUserDormantDto: CreateUserDormantDto): string;
    findAll(take: number, page: number, search: string[], order: string): Promise<{
        results: import("./entities/user-dormant.entity").UserDormantEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
}
