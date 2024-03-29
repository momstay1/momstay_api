import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserLeaveService } from './user-leave.service';
import { CreateUserLeaveDto } from './dto/create-user-leave.dto';
import { UpdateUserLeaveDto } from './dto/update-user-leave.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';

@Controller('user-leave')
export class UserLeaveController {
  constructor(private readonly userLeaveService: UserLeaveService) { }

  // @Post()
  // create(@Body() createUserLeaveDto: CreateUserLeaveDto) {
  //   return this.userLeaveService.create(createUserLeaveDto);
  // }

  // @Get()
  // findAll() {}

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userLeaveService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserLeaveDto: UpdateUserLeaveDto) {
  //   return this.userLeaveService.update(+id, updateUserLeaveDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userLeaveService.remove(+id);
  // }
}
