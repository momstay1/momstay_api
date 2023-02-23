import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PgNotiService } from './pg-noti.service';
import { CreatePgNotiDto } from './dto/create-pg-noti.dto';
import { UpdatePgNotiDto } from './dto/update-pg-noti.dto';

@Controller('pg-noti')
export class PgNotiController {
  constructor(private readonly pgNotiService: PgNotiService) {}

  @Post()
  create(@Body() createPgNotiDto: CreatePgNotiDto) {
    return this.pgNotiService.create(createPgNotiDto);
  }

  @Get()
  findAll() {
    return this.pgNotiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pgNotiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePgNotiDto: UpdatePgNotiDto) {
    return this.pgNotiService.update(+id, updatePgNotiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pgNotiService.remove(+id);
  }
}
