import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { commonBcrypt } from 'src/common/common.bcrypt';
import { GroupsService } from 'src/groups/groups.service';
import { UsersService } from 'src/users/users.service';
import { ResponseAuthDto } from './dto/response-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly groupsService: GroupsService
  ) { }

  async validateUser(id: string, password: string): Promise<any> {
    const user = await this.userService.findOne(id);
    const isHashValid = await commonBcrypt.isHashValid(password, user.user_password);
    if (user && isHashValid) {
      const { user_password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user): Promise<ResponseAuthDto> {
    const userInfo = await this.userService.findOne(user.user_id);
    const group = await this.groupsService.findOne(userInfo.user_group.grp_idx);
    const payload = { userId: userInfo.user_id, userName: userInfo.user_name, userGrp: group.grp_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
