import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { commonBcrypt } from 'src/common/common-bcrypt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { ResponseAuthDto } from './dto/response-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
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
    const payload = { userId: user.user_id, userName: user.user_name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
