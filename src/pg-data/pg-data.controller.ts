import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PgDataService } from './pg-data.service';
import { CreatePgDatumDto } from './dto/create-pg-data.dto';
import { UpdatePgDatumDto } from './dto/update-pg-data.dto';

@Controller('pg-data')
export class PgDataController {
  constructor(private readonly pgDataService: PgDataService) { }

  @Post()
  create(@Body() createPgDatumDto: CreatePgDatumDto) {
    // return this.pgDataService.create(createPgDatumDto);
  }

  @Get()
  findAll() {
    return this.pgDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pgDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePgDatumDto: UpdatePgDatumDto) {
    return this.pgDataService.update(+id, updatePgDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pgDataService.remove(+id);
  }
}
