import { ConsoleLogger, Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { map } from 'lodash';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
import { commonBcrypt } from 'src/common/common.bcrypt';
import { GroupsService } from 'src/groups/groups.service';
import { LoginService } from 'src/login/login.service';
import { UserSnsService } from 'src/user-sns/user-sns.service';
import { usersConstant } from 'src/users/constants';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';
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
    let user = await this.userService.fineUser(id);
    if (user.status == usersConstant.status.dormant) {
      // 휴면 회원인 경우 회원 복원 처리
      await this.userService.dormantRecovery(user.id);
      user = await this.userService.fineUser(id);
    }
    if (user.status != usersConstant.status.registration) {
      throw new NotFoundException('auth.service.validateUser: 존재하지 않는 아이디 입니다.');
    }
    const isHashValid = await commonBcrypt.isHashValid(password, user.password);
    const isSha1HashValid = await commonBcrypt.isSha1HashValid(password, user.prevPassword);

    if (user && isHashValid) {
      const { password, ...result } = user;
      return result;
    } else if (user && isSha1HashValid) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new NotAcceptableException('auth.service.validateUser: 비밀번호가 틀립니다.');
    }
    return null;
  }

  async login(user, type): Promise<ResponseAuthDto> {
    const userInfo = await this.userService.fineUser(user.id);
    if (type && type.indexOf(userInfo.group.id) == -1) {
      throw new NotFoundException('존재하지 않는 아이디 입니다.');
    }
    const payload = { userId: userInfo.id, userName: userInfo.name, userGrp: userInfo.group.id };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign({}, { expiresIn: jwtConstants.refresh_expried_on }),
    };
  }

  async snsLogin(snsLoginUserDto): Promise<ResponseAuthDto> {
    const snsUserInfo = await this.userSnsService.findId(snsLoginUserDto.id);
    const user = await this.userService.findId(snsUserInfo.user.id);
    const payload = { userId: user.id, userName: user.name, userGrp: user.group.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign({}, { expiresIn: jwtConstants.refresh_expried_on }),
    };
  }
}
