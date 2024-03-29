import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { get, map } from 'lodash';
import { AuthService } from 'src/auth/auth.service';
import { ResponseAuthDto } from 'src/auth/dto/response-auth.dto';
import { GetUser } from 'src/auth/getuser.decorator';
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
import { AdminUsersService } from './admin-users.service';
import { AdminUsersEntity } from './entities/admin-user.entity';

@Controller('admin-userss')
// @ApiTags('관리자 유저 API')
export class AdminUsersController {
  // constructor(
  //   private authService: AuthService,
  //   private readonly adminUsersService: AdminUsersService,
  //   private readonly usersService: UsersService,
  // ) { }

  // sanitizeUsers(admin) {
  //   return commonUtils.sanitizeEntity(admin, this.adminUsersService.getPrivateColumn());
  // };

  // sanitizeAdmin(admin) {
  //   return commonUtils.sanitizeEntity(admin, this.adminUsersService.getAdminPrivateColumn());
  // };

  // // 회원 생성
  // @Post()
  // @ApiOperation({ summary: '관리자_생성 API' })
  // @ApiCreatedResponse({ type: CreateUserDto })
  // @ApiUnprocessableEntityResponse({ type: ResponseErrorDto })
  // async create(@Body() createUserDto: CreateUserDto) {
  //   const user = await this.adminUsersService.create(createUserDto);
  //   // return this.authService.admin_login(user);
  //   return this.sanitizeAdmin(user);
  // }

  // // 회원 로그인
  // @Post('login')
  // @ApiOperation({ summary: '관리자_로그인 API' })
  // @ApiBody({ type: LoginUserDto })
  // @ApiCreatedResponse({ type: ResponseAuthDto })
  // @ApiUnauthorizedResponse({ type: ResponseErrDto })
  // async login(@Body('id') id: string, @Body('password') password: string) {
  //   return this.authService.admin_login(id, password);
  // }

  // // 회원 리스트 조회
  // @Get()
  // @Auth(['root', 'admin'])
  // @ApiOperation({ summary: '관리자_회원 리스트 API' })
  // @ApiBearerAuth()
  // async findAll(@Query('take') take: number, @Query('page') page: number) {
  //   const {
  //     results,
  //     total,
  //     pageTotal
  //   } = await this.usersService.findAll({ take, page });
  //   return {
  //     results: map(results, (obj) => {
  //       return this.sanitizeUsers(obj);
  //     }),
  //     total,
  //     pageTotal
  //   };
  // }

  // // 관리자 리스트 조회
  // @Get('admin')
  // @Auth(['root', 'admin'])
  // @ApiOperation({ summary: '관리자_관리자 리스트 API' })
  // @ApiBearerAuth()
  // async findAllAdmin(
  //   @GetUser() user: AdminUsersEntity,
  //   @Query('take') take: number,
  //   @Query('page') page: number
  // ) {
  //   const {
  //     results,
  //     total,
  //     pageTotal
  //   } = await this.adminUsersService.findAll(user, { take, page });
  //   return {
  //     results: map(results, (obj) => {
  //       return this.sanitizeAdmin(obj);
  //     }),
  //     total,
  //     pageTotal
  //   };
  // }


  // // 관리자 정보 가져오기
  // @Get('profile')
  // @Auth(['root', 'admin'])
  // @ApiOperation({ summary: '관리자_정보 API' })
  // @ApiBearerAuth()
  // @ApiOkResponse({ type: ProfileUserDto })
  // async getProfile(@GetUser() user: AdminUsersEntity) {
  //   const data = await this.adminUsersService.findOne(get(user, 'user_id', ''));
  //   return this.sanitizeAdmin(data);
  // }

  // // 회원 정보 가져오기
  // @Get('admin/:id')
  // @Auth(['root', 'admin'])
  // @ApiOperation({ summary: '관리자_회원상세정보 API' })
  // @ApiOkResponse({ type: ProfileUserDto })
  // async findId(@Param('id') id: string, @Query('type') type: string) {
  //   let data;
  //   if (type == 'admin') {
  //     data = this.sanitizeAdmin(await this.adminUsersService.findOne(id));
  //   } else {
  //     data = this.sanitizeUsers(await this.usersService.findOne(id));
  //   }
  //   return data;
  // }

  // // 회원 수정
  // @Patch('admin/:id')
  // @Auth(['root', 'admin'])
  // @ApiOperation({ summary: '관리자_회원정보수정 API' })
  // @ApiOkResponse({ type: ProfileUserDto })
  // @ApiBody({ type: UpdateUserDto })
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Query('type') type: string) {
  //   let user;
  //   if (type == 'admin') {
  //     user = this.sanitizeAdmin(await this.adminUsersService.update(id, updateUserDto));
  //   } else {
  //     user = this.sanitizeUsers(await this.usersService.update(id, updateUserDto));
  //   }
  //   return user;
  // }

  // // 회원 삭제
  // @Delete()
  // @Auth(['root', 'admin'])
  // @ApiOperation({ summary: '관리자_회원정보삭제 API' })
  // @ApiBody({ type: DeleteUserDto })
  // @HttpCode(204)
  // async remove(@Body('user_ids') user_ids, @Query('type') type: string) {
  //   if (type == 'admin') {
  //     await this.adminUsersService.removes(user_ids);
  //   } else {
  //     await this.usersService.removes(user_ids);
  //   }
  // }

}
