import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
import { commonBcrypt } from 'src/common/common.bcrypt';
import { GroupsService } from 'src/groups/groups.service';
import { usersConstant } from 'src/users/constants';
import { UsersService } from 'src/users/users.service';
import { ResponseAuthDto } from './dto/response-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly adminService: AdminUsersService,
    private readonly jwtService: JwtService,
    private readonly groupsService: GroupsService
  ) { }

  async validateUser(id: string, password: string): Promise<any> {
    const user = await this.userService.findOne(id);
    if (user.user_status != usersConstant.status.registration) {
      throw new NotFoundException('존재하지 않는 아이디 입니다.');
    }
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

  async admin_login(id, password): Promise<ResponseAuthDto> {
    const admin = await this.adminService.findOne(id);
    const isHashValid = await commonBcrypt.isHashValid(password, admin.admin_password);
    if (admin && isHashValid) {
      const group = await this.groupsService.findOne(admin.admin_group.grp_idx);
      const payload = { userId: admin.admin_id, userName: admin.admin_name, userGrp: group.grp_id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      return null;
    }
  }
}
