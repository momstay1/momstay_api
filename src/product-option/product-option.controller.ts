import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductOptionService } from './product-option.service';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { multerOptions } from 'src/common/common.file';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/common/decorator/role.decorator';

@Controller('product-option')
@ApiTags('방 API')
export class ProductOptionController {
  constructor(private readonly productOptionService: ProductOptionService) { }

  @Post()
  @Auth(['root', 'admin', 'host'])
  @ApiBearerAuth()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'roomDetailImg', maxCount: 5 },
  ], multerOptions()))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createProductOptionDto: CreateProductOptionDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return await this.productOptionService.create(createProductOptionDto, files);
  }

  // 방 리스트 조회
  @Get()
  @ApiOperation({
    summary: '방 리스트 조회 API',
    // description: 'search=membership:(0|1)<br>'
    //   + 'search=keyword:메인검색<br>'
  })
  async findAll(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[]) {
    const {
      results,
      total,
      pageTotal
    } = await this.productOptionService.findAll({ take, page }, search);
    return {
      results,
      total,
      pageTotal
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productOptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductOptionDto: UpdateProductOptionDto) {
    return this.productOptionService.update(+id, updateProductOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productOptionService.remove(+id);
  }
}
