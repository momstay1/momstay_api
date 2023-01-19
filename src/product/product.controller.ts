import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // 숙소 리스트 조회
  @Get()
  @ApiOperation({
    summary: '숙소 리스트 조회 API',
    // description: 'search=group:그룹인덱스1,그룹인덱스2<br>'
    //   + 'search=id:아이디<br>'
    //   + 'search=name:이름<br>'
    //   + 'search=email:이메일<br>'
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
    } = await this.productService.findAll({ take, page }, search);
    return {
      results,
      total,
      pageTotal
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
