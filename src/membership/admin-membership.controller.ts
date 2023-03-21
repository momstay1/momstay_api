import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { GetUser } from 'src/auth/getuser.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';

@Controller('admin/membership')
@ApiTags('관리자 멤버십 API')
export class AdminMembershipController {
  constructor(private readonly membershipService: MembershipService) { }

  @Get()
  @ApiOperation({ summary: '관리자 멤버십 리스트 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiQuery({
    name: "search",
    description: 'search=status:1,2<br>'
      + 'search=depositor:예금주명<br>'
      + 'search=month:멤버십 기간(1,3,6,12)<br>'
    ,
    required: false
  })
  @ApiQuery({
    name: "order",
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
    required: false
  })
  async findAll(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string
  ) {
    const { data } = await this.membershipService.findAll({ take, page }, search, order);
    return { ...data };
  }

  @Get(':idx')
  @ApiOperation({ summary: '관리자 멤버십 상세 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  async findOne(@Param('idx') idx: string) {
    return await this.membershipService.findOne(+idx);
  }

  @Patch(':idx')
  @ApiOperation({ summary: '관리자 멤버십 승인 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  async membershipApproval(
    @Param('idx') idx: string,
    @Body() updateMembershipDto: UpdateMembershipDto
  ) {
    return await this.membershipService.membershipApproval(+idx, updateMembershipDto);
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
