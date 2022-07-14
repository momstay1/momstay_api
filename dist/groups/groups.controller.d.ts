import { GroupsService } from './groups.service';
import { GroupsEntity } from './entities/group.entity';
import { AdminUsersEntity } from 'src/admin-users/entities/admin-user.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    findAll(user: AdminUsersEntity | UsersEntity): Promise<GroupsEntity[]>;
}
