import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { get, map } from 'lodash';
import { AuthService } from 'src/auth/auth.service';
import { ResponseAuthDto } from 'src/auth/dto/response-auth.dto';
import { GetUser } from 'src/auth/getuser.decorator';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { multerOptions } from 'src/common/common.file';
import { commonUtils } from 'src/common/common.utils';
import { Auth } from 'src/common/decorator/role.decorator';
import { ResponseErrDto } from 'src/error/dto/response-err.dto';
import { ResponseErrorDto } from 'src/error/dto/response-error.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { DeleteUserDto } from 'src/users/dto/delete-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ProfileUserDto } from 'src/users/dto/profile-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from './entities/user.entity';

@Controller('admin/users')
@ApiTags('관리자 유저 API')
export class AdminUsersController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  // 회원 생성
  @Post()
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자_생성 API' })
  @ApiUnprocessableEntityResponse({ type: ResponseErrorDto })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'profile', maxCount: 1 },
  ], multerOptions()))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    const user = await this.usersService.create(createUserDto, files);
    return user;
  }

  // 회원 로그인
  @Post('login')
  @ApiOperation({ summary: '관리자_로그인 API' })
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @ApiCreatedResponse({ type: ResponseAuthDto })
  @ApiUnauthorizedResponse({ type: ResponseErrDto })
  async login(@GetUser() user: UsersEntity) {
    return this.authService.login(user, ['root', 'admin']);
  }

  // 회원 리스트 조회
  @Get()
  @Auth(['root', 'admin'])
  @ApiOperation({
    summary: '관리자_회원 리스트 API',
    description: 'search=group:그룹인덱스1,그룹인덱스2<br>'
      + 'search=id:아이디<br>'
      + 'search=name:이름<br>'
      + 'search=email:이메일<br>'
      + 'search=phone:연락처<br>'
      + 'search=birthday:생일<br>'
      + 'search=createdAt_mte:시작날짜<br>'
      + 'search=createdAt_lte:종료날짜<br>'
  })
  @ApiBearerAuth()
  async findAll(
    @GetUser() user: UsersEntity,
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[]
  ) {
    console.log({ search });
    const {
      results,
      total,
      pageTotal
    } = await this.usersService.findAll(user, { take, page }, search);
    return {
      results,
      total,
      pageTotal
    };
  }

  // 회원 정보 가져오기
  @Get(':id')
  @Auth(['root', 'admin'])
  @ApiOperation({ summary: '회원 아이디 조회 API' })
  @ApiOkResponse({ type: ProfileUserDto })
  async findId(@Param('id') id: string) {
    const data = await this.usersService.findId(id);
    return data;
  }

  // 회원 수정 (sns 정보 수정 및 그룹 정보수정 기능 추가 작업 필요)
  @Patch(':id')
  @Auth(['root', 'admin'])
  @ApiOperation({ summary: '관리자_회원정보수정 API' })
  @ApiOkResponse({ type: ProfileUserDto })
  @ApiBody({ type: UpdateUserDto })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'profile', maxCount: 1 },
  ], multerOptions()))
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    const user = await this.usersService.update(id, updateUserDto, files);
    return user;
  }

  // 회원 삭제
  @Delete()
  @Auth(['root', 'admin'])
  @ApiOperation({ summary: '관리자_회원정보삭제 API' })
  @ApiBody({ type: DeleteUserDto })
  @HttpCode(204)
  async remove(@Body('user_ids') user_ids) {
    await this.usersService.removes(user_ids);
  }

  // 회원 엑셀 다운로드 기능 추가 작업 필요
}