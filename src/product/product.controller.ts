import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/common.file';

@Controller('product')
@ApiTags('숙소 API')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // 테스트용
  @Get('test/:id')
  async test(@Param('id') id: string) {
    const data = await this.productService.test(id);
    return data;
  }

  @Post()
  @ApiOperation({
    summary: '숙소 등록 API',
  })
  @Auth(['root', 'admin', 'host'])
  @ApiBearerAuth()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'lodgingDetailImg', maxCount: 5 },
    { name: 'mealsImg', maxCount: 5 },
  ], multerOptions()))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return await this.productService.create(createProductDto, files);
  }

  // 숙소 리스트 조회
  @Get()
  @ApiOperation({ summary: '숙소 리스트 조회 API' })
  @ApiQuery({
    name: "search",
    description: 'search=membership:(0|1)<br>'
      + 'search=keyword:메인검색<br>'
      + 'search=user_idx:회원idx(사용안함)<br>'
      + 'search=status:상태값(0:미등록|1:미사용|2:사용)<br>'
      + 'search=stayStatus:상태값(1:공실|2:만실)<br>'
      + 'search=min_priceMonth:월 최소 가격<br>'
      + 'search=max_priceMonth:월 최대 가격<br>'
      + 'search=product_info:편의시설 idx(2,3,4)<br>',
    required: false
  })
  @ApiQuery({
    name: "order",
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>'
    ,
    required: false
  })
  async findAll(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string
  ) {
    const {
      data,
      file_info
    } = await this.productService.findAll({ take, page }, search, order);
    // await this.productService.findAll({ take, page }, search);
    return {
      ...data,
      file_info
    };
  }

  @Get(':idx')
  @ApiOperation({ summary: '숙소 상세 조회 API' })
  async findOne(@Param('idx') idx: string) {
    return await this.productService.findOne(+idx);
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
