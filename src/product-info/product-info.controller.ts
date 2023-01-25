import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductInfoService } from './product-info.service';
import { CreateProductInfoDto } from './dto/create-product-info.dto';
import { UpdateProductInfoDto } from './dto/update-product-info.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('product-info')
@ApiTags('숙소 생활 및 편의 API')
export class ProductInfoController {
  constructor(private readonly productInfoService: ProductInfoService) { }

  @Post()
  create(@Body() createProductInfoDto: CreateProductInfoDto) {
    return this.productInfoService.create(createProductInfoDto);
  }

  @Get()
  @ApiOperation({
    summary: '숙소 샐활 및 편의 API',
  })
  async findAll() {
    return await this.productInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductInfoDto: UpdateProductInfoDto) {
    return this.productInfoService.update(+id, updateProductInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productInfoService.remove(+id);
  }
}
