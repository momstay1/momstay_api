import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
import { commonBcrypt } from 'src/common/common.bcrypt';
import { GroupsService } from 'src/groups/groups.service';
import { LoginService } from 'src/login/login.service';
import { UserSnsService } from 'src/user-sns/user-sns.service';
import { usersConstant } from 'src/users/constants';
import { UsersService } from 'src/users/users.service';
import { ResponseAuthDto } from './dto/response-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly groupsService: GroupsService,
    private readonly userSnsService: UserSnsService
  ) { }

  async validateUser(id: string, password: string): Promise<any> {
    const user = await this.userService.fineUser(id);
    if (user.status != usersConstant.status.registration) {
      throw new NotFoundException('존재하지 않는 아이디 입니다.');
    }
    const isHashValid = await commonBcrypt.isHashValid(password, user.password);
    const isSha1HashValid = await commonBcrypt.isSha1HashValid(password, user.prevPassword);

    if (user && isHashValid) {
      const { password, ...result } = user;
      return result;
    } else if (user && isSha1HashValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user, type): Promise<ResponseAuthDto> {
    const userInfo = await this.userService.fineUser(user.id);
    if (type && type.indexOf(userInfo.groups[0].id) == -1) {
      throw new NotFoundException('존재하지 않는 아이디 입니다.');
    }
    console.log(userInfo.groups);
    const group = await this.groupsService.findOne(userInfo.groups[0].idx);
    const payload = { userId: userInfo.id, userName: userInfo.name, userGrp: group.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async snsLogin(snsLoginUserDto): Promise<ResponseAuthDto> {
    const snsUserInfo = await this.userSnsService.findId(snsLoginUserDto.id);
    const user = await this.userService.findId(snsUserInfo.user.id);
    const payload = { userId: user.id, userName: user.name, userGrp: user.groups[0].id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
