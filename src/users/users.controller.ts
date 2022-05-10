import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { commonUtils } from 'src/common/common.utils';
import { map } from 'lodash';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger';
import { ResponseAuthDto } from 'src/auth/dto/response-auth.dto';
import { ResponseErrorDto } from 'src/error/dto/response-error.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseErrDto } from 'src/error/dto/response-err.dto';
import { ProfileUserDto } from './dto/profile-user.dto';
import { GetUser } from 'src/auth/getuser.decorator';
import { UsersEntity } from './entities/user.entity';
import { Auth } from 'src/common/decorator/role.decorator';

@Controller('users')
@ApiTags('유저 API')
export class UsersController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  sanitizeUsers(user) {
    return commonUtils.sanitizeEntity(user, this.usersService.getPrivateColumn());
  };

  // 회원 생성
  @Post()
  @ApiOperation({ summary: '회원 생성 API' })
  @ApiCreatedResponse({ type: ResponseAuthDto })
  @ApiUnprocessableEntityResponse({ type: ResponseErrorDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.authService.login(user);
  }

  // 회원 로그인
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @ApiCreatedResponse({ type: ResponseAuthDto })
  @ApiUnauthorizedResponse({ type: ResponseErrDto })
  async login(@GetUser() user: UsersEntity) {
    return this.authService.login(user);
  }

  // 회원 리스트 조회
  @Get()
  @Auth(['root'])
  async findAll() {
    const users = await this.usersService.findAll();
    return map(users, (obj) => {
      return this.sanitizeUsers(obj);
    });
  }

  // 회원 정보 가져오기
  @Get('profile')
  @Auth(['root'])
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProfileUserDto })
  async getProfile(@GetUser() user: UsersEntity) {
    const data = await this.usersService.findOne(user.user_id);
    return this.sanitizeUsers(data);
  }

  // 회원 아이디 조회
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return this.sanitizeUsers(user);
  }

  // 회원 수정
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return this.sanitizeUsers(user);
  }

  // 회원 삭제(탈퇴)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }

  // 비밀번호 찾기 기능 (아이디, 이메일 또는 휴대폰 본인인증)
  // 비밀번호 변경 기능 (비밀번호 찾기 이후 새로운 비밀번호로 설정하는 기능)
  // 아이디 찾기 기능 (가입이메일 또는 휴대폰 본인인증)
  // 이메일 인증회원가입
  // 휴대폰 본인인증
  // sns 회원가입
  // sns 로그인
  // 휴면 회원 활성화
}
