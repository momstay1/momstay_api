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
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CollegeService } from './college.service';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';

@Controller('college')
@ApiTags('대학교 API')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) { }

  @Post()
  create(@Body() createCollegeDto: CreateCollegeDto) {
    return this.collegeService.create(createCollegeDto);
  }

  @Get()
  @ApiOperation({ summary: '대학교 리스트 API' })
  @ApiQuery({
    name: "search",
    description: 'search=name:대학이름<br>',
    required: false
  })
  async findAll(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[]
  ) {
    const data = await this.collegeService.findAll({ take, page }, search);

    return { ...data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collegeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollegeDto: UpdateCollegeDto) {
    return this.collegeService.update(+id, updateCollegeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collegeService.remove(+id);
  }
}
