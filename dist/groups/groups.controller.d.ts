import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsEntity } from './entities/group.entity';
import { AdminUsersEntity } from 'src/admin-users/entities/admin-user.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    create(createGroupDto: CreateGroupDto): string;
    findAll(user: AdminUsersEntity | UsersEntity): Promise<GroupsEntity[]>;
    findOne(id: string): Promise<GroupsEntity>;
    update(id: string, updateGroupDto: UpdateGroupDto): string;
    remove(id: string): string;
}
