import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpCode,
} from '@nestjs/common';
import { ProductOptionService } from './product-option.service';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { multerOptions } from 'src/common/common.file';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/common/decorator/role.decorator';
import { createReadStream } from 'fs';
import { GetUser } from 'src/auth/getuser.decorator';

@Controller('product-option')
@ApiTags('방 API')
export class ProductOptionController {
  constructor(private readonly productOptionService: ProductOptionService) { }

  @Post()
  @ApiOperation({ summary: '방 생성 API' })
  @Auth(['root', 'admin', 'host'])
  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'roomDetailImg', maxCount: 5 }],
      multerOptions(),
    ),
  )
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createProductOptionDto: CreateProductOptionDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.productOptionService.create(
      createProductOptionDto,
      files,
    );
  }

  // 방 리스트 조회
  @Get()
  @ApiOperation({
    summary: '방 리스트 조회 API',
    // description: 'search=membership:(0|1)<br>'
    //   + 'search=keyword:메인검색<br>'
  })
  @ApiQuery({
    name: 'search',
    description:
      'search=membership:(0:무료|1:유료)<br>' +
      'search=title:숙소이름<br>' +
      'search=type:숙소타입<br>' +
      'search=addr1:주소1<br>' +
      'search=addr2:주소2<br>' +
      'search=metro:지하철<br>' +
      'search=college:대학교<br>' +
      'search=product_idx:숙소idx<br>' +
      'search=po_title:방 이름<br>' +
      'search=name:호스트이름<br>' +
      'search=id:호스트아이디<br>' +
      'search=status:상태값(-1:삭제|0:미등록|1:미사용|2:사용)<br>',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
    required: false,
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
    @Query('order') order: string,
  ) {
    const { data, file_info } = await this.productOptionService.findAll(
      { take, page },
      search,
      order,
    );
    return {
      ...data,
      file_info,
    };
  }

  // 방 리스트 조회
  @Get('/excel')
  @ApiOperation({
    summary: '방 리스트 엑셀 다운로드 API',
    // description: 'search=membership:(0|1)<br>'
    //   + 'search=keyword:메인검색<br>'
  })
  @ApiQuery({
    name: 'search',
    description:
      'search=membership:(0:무료|1:유료)<br>' +
      'search=title:string<br>' +
      'search=addr1:string<br>' +
      'search=addr2:string<br>' +
      'search=metro:string<br>' +
      'search=college:string<br>' +
      'search=product_idx:숙소idx<br>' +
      'search=status:상태값(0:미등록|1:미사용|2:사용)<br>',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
    required: false,
  })
  async excelDownload(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string,
    @Res() res,
  ) {
    // 엑셀 생성
    const excel_file = await this.productOptionService.createExcel(
      { take, page },
      search,
      order,
    );
    // 엑셀 다운로드
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition':
        'attachment; filename="' + excel_file.file_name + '"',
    });
    createReadStream(excel_file.file_path).pipe(res);
  }

  @Get('test')
  @ApiOperation({ summary: '테스트 API' })
  async test() {
    await this.productOptionService.koreaEximApi();
  }

  @Get(':idx')
  @ApiOperation({ summary: '방 상세 조회 API' })
  async findOne(@Param('idx') idx: string) {
    return await this.productOptionService.findOne(+idx);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductOptionDto: UpdateProductOptionDto,
  ) {
    return this.productOptionService.update(+id, updateProductOptionDto);
  }

  @Delete(':idx')
  @ApiOperation({ summary: '방 삭제 API' })
  @Auth(['root', 'admin', 'host'])
  @ApiBearerAuth()
  @HttpCode(204)
  remove(
    @GetUser() user,
    @Param('idx') idx: string
  ) {
    return this.productOptionService.hostRemove(user, +idx);
  }
}
