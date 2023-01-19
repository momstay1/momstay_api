import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Param,
  UseInterceptors,
  UploadedFiles,
  Req,
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

@Controller('users')
@ApiTags('유저 API')
export class UsersController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
    private readonly loginService: LoginService
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
  @ApiOperation({ summary: '회원 정보 API' })
  @ApiBearerAuth()
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
  async email(@Param('email') email: string) {
    await this.usersService.email(email);
  }

  // 테스트용
  @Get('test/:id')
  async test(@Param('id') id: string) {
    const data = await this.usersService.test(id);
    return data;
  }

  // 회원 수정
  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   const user = await this.usersService.update(id, updateUserDto);
  //   return this.sanitizeUsers(user);
  // }

  // 회원 삭제(탈퇴)
  // @Delete(':id')
  // @HttpCode(204)
  // async remove(@Param('id') id: string) {
  //   await this.usersService.remove(id);
  // }

}
