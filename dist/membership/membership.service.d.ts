import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { MembershipHistoryEntity } from './entities/membership-history.entity';
import { Pagination, PaginationOptions } from 'src/paginate';
import { ProductService } from 'src/product/product.service';
export declare class MembershipService {
    private membershipHistoryRepository;
    private readonly userService;
    private readonly productService;
    constructor(membershipHistoryRepository: Repository<MembershipHistoryEntity>, userService: UsersService, productService: ProductService);
    create(userInfo: UsersEntity, createMembershipDto: CreateMembershipDto): Promise<{
        membership: MembershipHistoryEntity;
    }>;
    findAll(options: PaginationOptions, search: string[], order: string): Promise<{
        data: Pagination<MembershipHistoryEntity>;
    }>;
    findOne(idx: number): Promise<{
        membership: MembershipHistoryEntity;
    }>;
    findOneIdx(idx: number): Promise<MembershipHistoryEntity>;
    findOneLastMembership(userIdx: number): Promise<MembershipHistoryEntity>;
    findOneUser(userInfo: UsersEntity): Promise<{
        membership: MembershipHistoryEntity;
    }>;
    update(id: number, updateMembershipDto: UpdateMembershipDto): string;
    changeStatus(idx: number, status: number): Promise<void>;
    membershipApproval(idx: number, updateMembershipDto: UpdateMembershipDto): Promise<{
        membership: MembershipHistoryEntity;
    }>;
    remove(id: number): string;
    checkMembership(): Promise<void>;
}
