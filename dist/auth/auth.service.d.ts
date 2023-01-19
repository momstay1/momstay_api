import { JwtService } from '@nestjs/jwt';
import { GroupsService } from 'src/groups/groups.service';
import { UserSnsService } from 'src/user-sns/user-sns.service';
import { UsersService } from 'src/users/users.service';
import { ResponseAuthDto } from './dto/response-auth.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly groupsService;
    private readonly userSnsService;
    constructor(userService: UsersService, jwtService: JwtService, groupsService: GroupsService, userSnsService: UserSnsService);
    validateUser(id: string, password: string): Promise<any>;
    login(user: any, type: any): Promise<ResponseAuthDto>;
    snsLogin(snsLoginUserDto: any): Promise<ResponseAuthDto>;
}
