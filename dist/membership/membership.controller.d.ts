import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class MembershipController {
    private readonly membershipService;
    constructor(membershipService: MembershipService);
    create(user: UsersEntity, createMembershipDto: CreateMembershipDto): Promise<{
        membership: import("./entities/membership-history.entity").MembershipHistoryEntity;
    }>;
    findOne(user: UsersEntity): Promise<{
        membership: import("./entities/membership-history.entity").MembershipHistoryEntity;
    }>;
    update(id: string, updateMembershipDto: UpdateMembershipDto): string;
    remove(id: string): string;
}
