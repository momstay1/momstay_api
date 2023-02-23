import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseGuards,
  Query,
  Param,
  UseInterceptors,
  UploadedFiles,
  Req,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { commonUtils } from 'src/common/common.utils';
import { get, map } from 'lodash';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
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
import { SnsLoginUserDto } from './dto/sns.login-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/common.file';
import { LoginService } from 'src/login/login.service';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('유저 API')
export class UsersController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
    private readonly loginService: LoginService,
    private readonly refreshTokenService: RefreshTokenService
  ) { }

  // 회원 생성
  @Post()
  @ApiOperation({ summary: '회원 생성 API' })
  @ApiCreatedResponse({ type: CreateUserDto })
  @ApiUnprocessableEntityResponse({ type: ResponseErrorDto })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'profile', maxCount: 1 },
  ], multerOptions()))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    const data = await this.usersService.create(createUserDto, files);
    return data;
  }

  // 회원 로그인
  @Post('login')
  @ApiOperation({ summary: '로그인 API' })
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @ApiCreatedResponse({ type: ResponseAuthDto })
  @ApiUnauthorizedResponse({ type: ResponseErrDto })
  async login(@GetUser() user: UsersEntity, @Req() req) {
    const jwt = await this.authService.login(user, '');
    await this.loginService.create(user, req);
    await this.refreshTokenService.insert(user, jwt);
    return jwt;
  }

  // access token 재발급
  @Post('reissued')
  @Auth(['Any'])
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'access token 재발급 API',
    description: '헤더에 refresh token 값으로 요청시<br>access token 및 refresh token 재발급'
  })
  async reissued(@Req() req) {
    const refreshToken = await this.refreshTokenService.findJwtOne(req.get('authorization'));
    const user = await this.usersService.findIdx(+refreshToken.user_idx);
    const jwt = await this.authService.login(user, '');
    await this.refreshTokenService.insert(user, jwt);
    return jwt;
  }

  // sns회원 로그인
  @Post('snslogin')
  @ApiOperation({ summary: '로그인 API' })
  @ApiBody({ type: SnsLoginUserDto })
  @ApiCreatedResponse({ type: ResponseAuthDto })
  @ApiUnauthorizedResponse({ type: ResponseErrDto })
  async snsLogin(@Body() snsLoginUserDto: SnsLoginUserDto) {
    return this.authService.snsLogin(snsLoginUserDto);
  }

  // 인증 코드 확인
  @Post('emailckeck')
  @ApiOperation({ summary: '인증 코드 확인 API' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', description: '이메일' },
        code: { type: 'string', description: '인증코드' },
      }
    }
  })
  async emailChk(@Body('email') email: string, @Body('code') code: string) {
    await this.usersService.emailChk(email, code);
  }

  // 회원 정보 가져오기
  @Get('profile')
  @Auth(['Any'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 정보 API' })
  @ApiOkResponse({ type: ProfileUserDto })
  async getProfile(@GetUser() user: UsersEntity) {
    const data = await this.usersService.findId(get(user, 'id', ''));
    return data;
  }

  // 회원 정보 가져오기
  @Get('uniquekey/:uniquekey')
  @ApiOperation({ summary: '본인인증시 회원 존재여부 체크 API' })
  @ApiOkResponse({ type: ProfileUserDto })
  async getUniqueKey(@Param('uniquekey') uniquekey: string,) {
    const data = await this.usersService.findOne({ uniqueKey: uniquekey });
    return data;
  }

  // 로그인시 아이디 또는 이메일 회원 체크
  @Get('logincheck/:id')
  @ApiOperation({ summary: '로그인시 아이디 체크 API' })
  @ApiOkResponse({ type: ProfileUserDto })
  async loginChk(@Param('id') id: string) {
    const data = await this.usersService.fineUser(id);
    return data;
  }

  // 인증 메일 발송
  @Get('email/:email')
  @ApiOperation({ summary: '인증 메일 발송 API' })
  @ApiQuery({
    name: "type",
    description: 'type=[pw|sign]'
  })
  async email(@Param('email') email: string, @Query('type') type: string) {
    return await this.usersService.email(email, type);
  }

  // 테스트용
  @Get('test/:id')
  async test(@Param('id') id: string) {
    const data = await this.usersService.test(id);
    return data;
  }

  // 비회원 비밀번호 재설정
  @Patch('chpw')
  @ApiOperation({ summary: '비회원 비밀번호 재설정 API' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '아이디' },
        password: { type: 'string', description: '비밀번호' },
      }
    }
  })
  async changePassword(
    @Body('id') id: string,
    @Body('password') password: string
  ) {
    const data = await this.usersService.chpw(id, password);
    return data;
  }

  // 회원 비밀번호 재설정
  @Patch('rspw')
  @Auth(['root', 'admin', 'host', 'guest'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 비밀번호 재설정 API' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        prevpassword: { type: 'string', description: '이전 비밀번호' },
        password: { type: 'string', description: '비밀번호' },
      }
    }
  })
  async resettingPassword(
    @GetUser() user: UsersEntity,
    @Body('prevpassword') prevpassword: string,
    @Body('password') password: string
  ) {
    const data = await this.usersService.rspw(user, prevpassword, password);
    return data;
  }

  // 회원 수정
  @Patch(':id')
  @Auth(['root', 'admin', 'host', 'guest'])
  @ApiBearerAuth()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'profile', maxCount: 1 },
  ], multerOptions()))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '회원 정보 수정 API' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return await this.usersService.update(id, updateUserDto, files);
  }

  // 회원 삭제(탈퇴)
  @Delete('leave/:id')
  @HttpCode(204)
  async leave(@Param('id') id: string) {
    await this.usersService.leave(id);
  }

}
