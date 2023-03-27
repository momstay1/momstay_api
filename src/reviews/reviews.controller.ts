import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { HttpCode, Query, UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/common.file';
import { GetUser } from 'src/auth/getuser.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';

@Controller('reviews')
@ApiTags('후기 API')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Post()
  @ApiOperation({ summary: '후기 등록 API' })
  @Auth(['Any'])
  @ApiBearerAuth()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'reviewImg', maxCount: 10 },
  ], multerOptions()))
  @ApiConsumes('multipart/form-data')
  async create(
    @GetUser() user: UsersEntity,
    @Body() createReviewDto: CreateReviewDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return await this.reviewsService.create(user, createReviewDto, files);
  }

  @Get('/test')
  async test() {
    // await this.reviewsService.averageStar(7);
  }

  @Get('/product/:idx')
  @ApiOperation({
    summary: '숙소 상세 후기 리스트 조회 API',
  })
  @ApiParam({
    name: "idx",
    description: 'product idx값',
  })
  @ApiQuery({
    name: "search",
    description: 'search=status:상태값(1:삭제|2:등록, 기본값:2)<br>'
    ,
    required: false
  })
  @ApiQuery({
    name: "order",
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>'
    ,
    required: false
  })
  async findAllProduct(
    @Param('idx') idx: number,
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string
  ) {
    const {
      data,
      file_info
    } = await this.reviewsService.findAllProduct(idx, { take, page }, search, order);

    return {
      ...data,
      file_info
    };
  }

  @Get(':idx')
  @ApiOperation({ summary: '후기 상세 조회 API' })
  @ApiParam({ name: 'idx', description: 'review idx' })
  async findOne(@Param('idx') idx: string) {
    return await this.reviewsService.findOne(+idx);
  }

  @Patch(':idx')
  @ApiOperation({
    summary: '후기 수정 API',
    description: 'status, star, content, reviewImg 만 변경 가능'
  })
  @Auth(['Any'])
  @ApiBearerAuth()
  @ApiParam({ name: 'idx', description: 'review idx' })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'reviewImg', maxCount: 10 },
  ], multerOptions()))
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('idx') idx: number,
    @GetUser() user: UsersEntity,
    @Body() updateReviewDto: UpdateReviewDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return await this.reviewsService.update(idx, user, updateReviewDto, files);
  }

  @Delete()
  @ApiOperation({ summary: '후기 삭제 API' })
  @Auth(['Any'])
  @ApiBearerAuth()
  @ApiBody({
    description: 'review idx를 배열로 전달 ex) [1,2,3]<br>'
      + '관리자 계정의 경우 여러 후기 한번에 삭제 가능<br>'
      + '일반 사용자의 경우 1개만 삭제 가능'
    ,
    schema: {
      properties: {
        idxs: {
          example: [],
        }
      }
    }
  })
  @HttpCode(204)
  async statusUpdate(
    @GetUser() user: UsersEntity,
    @Body('idxs') idxs: []
  ) {
    await this.reviewsService.statusUpdate(idxs, user);
  }
}
