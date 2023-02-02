import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductOptionService } from './product-option.service';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { multerOptions } from 'src/common/common.file';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/common/decorator/role.decorator';

@Controller('product-option')
@ApiTags('방 API')
export class ProductOptionController {
  constructor(private readonly productOptionService: ProductOptionService) { }

  @Post()
  @ApiOperation({ summary: '방 생성 API' })
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
  @ApiQuery({
    name: "search",
    description: "search=membership:(0:무료|1:유료)<br>"
      + "search=title:string<br>"
      + "search=addr1:string<br>"
      + "search=addr2:string<br>"
      + "search=metro:string<br>"
      + "search=college:string<br>"
      + "search=product_idx:숙소idx<br>"
      + "search=status:상태값(0:미등록|1:미사용|2:사용)<br>",
    required: false
  })
  async findAll(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[]) {
    const {
      data: {
        results,
        total,
        pageTotal
      },
      file_info
    } = await this.productOptionService.findAll({ take, page }, search);
    return {
      results,
      total,
      pageTotal,
      file_info
    };
  }

  @Get(':idx')
  @ApiOperation({ summary: '방 상세 조회 API' })
  async findOne(@Param('idx') idx: string) {
    return await this.productOptionService.findOne(+idx);
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
