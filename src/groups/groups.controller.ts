import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsEntity } from './entities/group.entity';
import { Auth } from 'src/common/decorator/role.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetUser } from 'src/auth/getuser.decorator';
import { AdminUsersEntity } from 'src/admin-users/entities/admin-user.entity';
import { UsersEntity } from 'src/users/entities/user.entity';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @Auth(['root', 'admin', 'basic'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '그룹 리스트 API' })
  @ApiOkResponse({ type: GroupsEntity })
  async findAll(@GetUser() user: AdminUsersEntity | UsersEntity) {
    return await this.groupsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
