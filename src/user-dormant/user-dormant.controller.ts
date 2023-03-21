import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserDormantService } from './user-dormant.service';
import { CreateUserDormantDto } from './dto/create-user-dormant.dto';
import { UpdateUserDormantDto } from './dto/update-user-dormant.dto';

@Controller('user-dormant')
export class UserDormantController {
  constructor(private readonly userDormantService: UserDormantService) { }

  // @Post()
  // create(@Body() createUserDormantDto: CreateUserDormantDto) {
  //   return this.userDormantService.create(createUserDormantDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userDormantService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userDormantService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDormantDto: UpdateUserDormantDto) {
  //   return this.userDormantService.update(+id, updateUserDormantDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userDormantService.remove(+id);
  // }
}
