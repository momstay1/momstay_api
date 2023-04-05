import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/common.file';

@Controller('admin/product')
@ApiTags('숙소(관리자) API')
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
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiQuery({
    name: "search",
    description: 'search=membership:(0|1)<br>'
      + 'search=keyword:메인검색<br>'
      + 'search=user_idx:회원idx(사용안함)<br>'
      + 'search=title:숙소이름<br>'
      + 'search=name:호스트이름<br>'
      + 'search=id:호스트아이디<br>'
      + 'search=status:상태값(-1:삭제|0:미등록|1:미사용|2:사용)<br>',
    required: false
  })
  @ApiQuery({
    name: "order",
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>'
    ,
    required: false
  })
  async adminFindAll(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string
  ) {
    const {
      data,
      file_info
    } = await this.productService.adminFindAll({ take, page }, search, order);
    return {
      ...data,
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

  @Delete(':idx')
  @ApiOperation({ summary: '숙소 삭제 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @HttpCode(204)
  async remove(@Param('idx') idx: string) {
    await this.productService.remove(+idx);
  }
}
