import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { GetUser } from 'src/auth/getuser.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';

@Controller('membership')
@ApiTags('멤버십 API')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) { }

  @Post()
  @ApiOperation({
    summary: '멤버십 신청 API',
    description: 'status값 미 입력시 자동으로 1 값으로 저장',
  })
  @Auth(['root', 'admin', 'host'])
  @ApiBearerAuth()
  async create(
    @GetUser() user: UsersEntity,
    @Body() createMembershipDto: CreateMembershipDto
  ) {
    console.log({ user });
    return await this.membershipService.create(user, createMembershipDto);
  }

  @Get()
  @ApiOperation({
    summary: '마지막 멤버십 신청 정보 가져오기 API',
  })
  @Auth(['root', 'admin', 'host'])
  @ApiBearerAuth()
  async findOne(
    @GetUser() user: UsersEntity,
  ) {
    return await this.membershipService.findOneUser(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMembershipDto: UpdateMembershipDto) {
    return this.membershipService.update(+id, updateMembershipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membershipService.remove(+id);
  }
}
