import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { get } from 'lodash';
import { AuthService } from 'src/auth/auth.service';
import { ResponseAuthDto } from 'src/auth/dto/response-auth.dto';
import { GetUser } from 'src/auth/getuser.decorator';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { commonUtils } from 'src/common/common.utils';
import { Auth } from 'src/common/decorator/role.decorator';
import { ResponseErrDto } from 'src/error/dto/response-err.dto';
import { ResponseErrorDto } from 'src/error/dto/response-error.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ProfileUserDto } from 'src/users/dto/profile-user.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
import { AdminUsersService } from './admin-users.service';

@Controller('admin-users')
@ApiTags('관리자 유저 API')
export class AdminUsersController {
  constructor(
    private authService: AuthService,
    private readonly adminUsersService: AdminUsersService
  ) { }

  sanitizeUsers(admin) {
    return commonUtils.sanitizeEntity(admin, this.adminUsersService.getPrivateColumn());
  };

  // 회원 생성
  @Post()
  @ApiOperation({ summary: '관리자 생성 API' })
  @ApiCreatedResponse({ type: ResponseAuthDto })
  @ApiUnprocessableEntityResponse({ type: ResponseErrorDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.adminUsersService.create(createUserDto);
    // return this.authService.admin_login(user);
    return user;
  }

  // 회원 로그인
  @Post('login')
  @ApiOperation({ summary: '관리자 로그인 API' })
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @ApiCreatedResponse({ type: ResponseAuthDto })
  @ApiUnauthorizedResponse({ type: ResponseErrDto })
  async login(@GetUser() user: UsersEntity) {
    return this.authService.login(user);
  }

  // 회원 정보 가져오기
  @Get('profile')
  @Auth(['root'])
  @ApiOperation({ summary: '관리자 정보 API' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProfileUserDto })
  async getProfile(@GetUser() user: UsersEntity) {
    const data = await this.adminUsersService.findOne(get(user, 'user_id', ''));
    return this.sanitizeUsers(data);
  }
}
