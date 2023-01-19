import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductOptionService } from './product-option.service';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('product-option')
export class ProductOptionController {
  constructor(private readonly productOptionService: ProductOptionService) { }

  @Post()
  create(@Body() createProductOptionDto: CreateProductOptionDto) {
    return this.productOptionService.create(createProductOptionDto);
  }

  // 방 리스트 조회
  @Get()
  @ApiOperation({
    summary: '방 리스트 조회 API',
    // description: 'search=group:그룹인덱스1,그룹인덱스2<br>'
    //   + 'search=membership:(0|1)<br>'
    //   + 'search=keyword:메인검색<br>'
    //   + 'search=addr1:이메일<br>'
    //   + 'search=phone:연락처<br>'
    //   + 'search=birthday:생일<br>'
    //   + 'search=createdAt_mte:시작날짜<br>'
    //   + 'search=createdAt_lte:종료날짜<br>'
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
