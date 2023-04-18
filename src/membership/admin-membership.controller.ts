import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { GetUser } from 'src/auth/getuser.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';
import { createReadStream } from 'fs';

@Controller('admin/membership')
@ApiTags('멤버십(관리자) API')
export class AdminMembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Get()
  @ApiOperation({ summary: '관리자 멤버십 리스트 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    description:
      'search=status:1,2<br>' +
      'search=depositor:예금주명<br>' +
      'search=name:신청자명<br>' +
      'search=id:신청자 아이디<br>' +
      'search=phone:신청자 연락처<br>' +
      'search=month:멤버십 기간(1,3,6,12)<br>',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
    required: false,
  })
  async findAll(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string,
  ) {
    const { data } = await this.membershipService.findAll(
      { take, page },
      search,
      order,
    );
    return { ...data };
  }

  @Get('excel')
  @ApiOperation({ summary: '관리자 멤버십 리스트 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    description:
      'search=status:1,2<br>' +
      'search=depositor:예금주명<br>' +
      'search=name:신청자명<br>' +
      'search=id:신청자 아이디<br>' +
      'search=phone:신청자 연락처<br>' +
      'search=month:멤버십 기간(1,3,6,12)<br>',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
    required: false,
  })
  async excelDownload(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string,
    @Res() res,
  ) {
    // 엑셀 생성
    const excel_file = await this.membershipService.createExcel(
      { take, page },
      search,
      order,
    );
    // 엑셀 다운로드
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition':
        'attachment; filename="' + excel_file.file_name + '"',
    });
    createReadStream(excel_file.file_path).pipe(res);
  }

  @Get(':idx')
  @ApiOperation({ summary: '관리자 멤버십 상세 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  async findOne(@Param('idx') idx: string) {
    return await this.membershipService.findOne(+idx);
  }

  @Patch(':idx')
  @ApiOperation({ summary: '관리자 멤버십 상태 변경 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  async membershipStatusChange(
    @Param('idx') idx: string,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ) {
    return await this.membershipService.membershipStatusChange(
      +idx,
      updateMembershipDto,
    );
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMembershipDto: UpdateMembershipDto) {
  //   return await this.membershipService.update(+id, updateMembershipDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membershipService.remove(+id);
  }
}
