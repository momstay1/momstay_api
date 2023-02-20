import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/common.file';

@Controller('admin/product')
@ApiTags('관리자 숙소 API')
export class AdminProductController {
  constructor(private readonly productService: ProductService) { }

  // @Post()
  // @ApiOperation({summary: '숙소 등록 API'})
  // @Auth(['root', 'admin', 'host'])
  // @ApiBearerAuth()
  // @UseInterceptors(FileFieldsInterceptor([
  //   { name: 'lodgingDetailImg', maxCount: 5 },
  //   { name: 'mealsImg', maxCount: 5 },
  // ], multerOptions()))
  // @ApiConsumes('multipart/form-data')
  // async create(
  //   @Body() createProductDto: CreateProductDto,
  //   @UploadedFiles() files: Array<Express.Multer.File>
  // ) {
  //   return await this.productService.create(createProductDto, files);
  // }

  // 숙소 리스트 조회
  @Get()
  @ApiOperation({ summary: '숙소 리스트 조회 API' })
  @ApiQuery({
    name: "search",
    description: 'search=membership:(0|1)<br>'
      + 'search=keyword:메인검색<br>'
      + 'search=user_idx:회원idx<br>'
      + 'search=status:상태값(0:미등록|1:미사용|2:사용)<br>',
    required: false
  })
  async adminFindAll(
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
    } = await this.productService.adminFindAll({ take, page }, search);
    return {
      results,
      total,
      pageTotal,
      file_info
    };
  }

  @Get(':idx')
  @ApiOperation({ summary: '숙소 상세 조회 API' })
  async findOne(@Param('idx') idx: string) {
    return await this.productService.adminFindOne(+idx);
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