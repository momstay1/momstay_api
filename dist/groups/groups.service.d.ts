import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsEntity } from './entities/group.entity';
export declare class GroupsService {
    private groupsRepository;
    constructor(groupsRepository: Repository<GroupsEntity>);
    create(createGroupDto: CreateGroupDto): string;
    findAll(): Promise<GroupsEntity[]>;
    findAllUser(user: any): Promise<GroupsEntity[]>;
    findAllName(group: any): Promise<GroupsEntity[]>;
    findOne(idx: number): Promise<GroupsEntity>;
    findIdxs(idxs: number[]): Promise<GroupsEntity[]>;
    findOneName(name: string): Promise<GroupsEntity>;
    update(id: number, updateGroupDto: UpdateGroupDto): string;
    remove(id: number): string;
}
