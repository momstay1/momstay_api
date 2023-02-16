import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PgCancelService } from './pg-cancel.service';
import { CreatePgCancelDto } from './dto/create-pg-cancel.dto';
import { UpdatePgCancelDto } from './dto/update-pg-cancel.dto';

@Controller('pg-cancel')
export class PgCancelController {
  constructor(private readonly pgCancelService: PgCancelService) {}

  @Post()
  create(@Body() createPgCancelDto: CreatePgCancelDto) {
    return this.pgCancelService.create(createPgCancelDto);
  }

  @Get()
  findAll() {
    return this.pgCancelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pgCancelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePgCancelDto: UpdatePgCancelDto) {
    return this.pgCancelService.update(+id, updatePgCancelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pgCancelService.remove(+id);
  }
}
