import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSnsService } from './user-sns.service';
import { CreateUserSnsDto } from './dto/create-user-sns.dto';
import { UpdateUserSnsDto } from './dto/update-user-sns.dto';

@Controller('user-sns')
export class UserSnsController {
  constructor(private readonly userSnsService: UserSnsService) { }

  @Post()
  create(@Body() createUserSnsDto: CreateUserSnsDto) {
    return this.userSnsService.create(createUserSnsDto);
  }

  @Get()
  findAll() {
    return this.userSnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSnsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSnsDto: UpdateUserSnsDto) {
    return this.userSnsService.update(+id, updateUserSnsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSnsService.remove(+id);
  }
}
