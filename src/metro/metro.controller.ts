import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { MetroService } from './metro.service';
import { CreateMetroDto } from './dto/create-metro.dto';
import { UpdateMetroDto } from './dto/update-metro.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('metro')
@ApiTags('지하철 API')
export class MetroController {
  constructor(private readonly metroService: MetroService) { }

  @Post()
  create(@Body() createMetroDto: CreateMetroDto) {
    return this.metroService.create(createMetroDto);
  }

  @Get()
  @ApiOperation({ summary: '지하철 리스트 API' })
  @ApiQuery({
    name: "search",
    description: 'search=station:역이름<br>',
    required: false
  })
  async findAll(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[]
  ) {
    const data = await this.metroService.findAll({ take, page }, search);

    return { ...data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMetroDto: UpdateMetroDto) {
    return this.metroService.update(+id, updateMetroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metroService.remove(+id);
  }
}
