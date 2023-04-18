import { MembershipService } from './membership.service';
import { UpdateMembershipDto } from './dto/update-membership.dto';
export declare class AdminMembershipController {
    private readonly membershipService;
    constructor(membershipService: MembershipService);
    findAll(take: number, page: number, search: string[], order: string): Promise<{
        results: import("./entities/membership-history.entity").MembershipHistoryEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    excelDownload(take: number, page: number, search: string[], order: string, res: any): Promise<void>;
    findOne(idx: string): Promise<{
        membership: import("./entities/membership-history.entity").MembershipHistoryEntity;
    }>;
    membershipStatusChange(idx: string, updateMembershipDto: UpdateMembershipDto): Promise<{
        membership: import("./entities/membership-history.entity").MembershipHistoryEntity;
    }>;
    remove(id: string): string;
}
