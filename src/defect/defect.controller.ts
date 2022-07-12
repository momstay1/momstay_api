import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DefectService } from './defect.service';
import { CreateDefectDto } from './dto/create-defect.dto';
import { UpdateDefectDto } from './dto/update-defect.dto';

@Controller('defect')
export class DefectController {
  constructor(private readonly defectService: DefectService) {}

  @Post()
  create(@Body() createDefectDto: CreateDefectDto) {
    return this.defectService.create(createDefectDto);
  }

  @Get()
  findAll() {
    return this.defectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.defectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDefectDto: UpdateDefectDto) {
    return this.defectService.update(+id, updateDefectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.defectService.remove(+id);
  }
}
