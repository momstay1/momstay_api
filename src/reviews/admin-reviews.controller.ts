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

@Controller('admin/reviews')
@ApiTags('후기(관리자) API')
export class AdminReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  // @Post()
  // @ApiOperation({ summary: '후기 등록 API' })
  // @Auth(['Any'])
  // @ApiBearerAuth()
  // @UseInterceptors(FileFieldsInterceptor([
  //   { name: 'reviewImg', maxCount: 10 },
  // ], multerOptions()))
  // @ApiConsumes('multipart/form-data')
  // async create(
  //   @GetUser() user: UsersEntity,
  //   @Body() createReviewDto: CreateReviewDto,
  //   @UploadedFiles() files: Array<Express.Multer.File>
  // ) {
  //   return await this.reviewsService.create(user, createReviewDto, files);
  // }

  // @Get('/test')
  // async test() {
  //   // await this.reviewsService.averageStar(7);
  // }

  @Get()
  @ApiOperation({
    summary: '숙소 상세 후기 리스트 조회 API',
  })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiQuery({
    name: "search",
    description: 'search=status:상태값(-1:삭제|1:미등록|2:등록, 기본값:2)<br>'
      + 'search=star:별점<br>'
      + 'search=name:작성자명<br>'
      + 'search=min_createdAt:최소날짜<br>'
      + 'search=max_createdAt:최대날짜<br>'
    ,
    required: false
  })
  @ApiQuery({
    name: "order",
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>'
    ,
    required: false
  })
  async adminFindAllProduct(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string
  ) {
    const {
      data,
      file_info
    } = await this.reviewsService.adminFindAllProduct({ take, page }, search, order);

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

  @Patch('status')
  @ApiOperation({
    summary: '후기 상태 일괄 수정 API',
    description: ''
  })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiBody({
    description: 'review idx를 배열로 전달 ex) [1,2,3]<br>'
      + 'status 값 (-1: 삭제|1: 미등록|2: 등록)<br>'
      + '삭제 api 대신 사용 가능'
    ,
    schema: {
      properties: {
        idxs: {
          example: [],
        },
        status: {
          example: '',
        }
      }
    }
  })
  async statusChange(
    @Body('idxs') idxs: [],
    @Body('status') status: string,
  ) {
    return await this.reviewsService.statusChange(idxs, status);
  }

  @Patch('star')
  @ApiOperation({
    summary: '후기 평점 일괄 수정 API',
    description: ''
  })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiBody({
    description: 'review idx를 배열로 전달 ex) [1,2,3]<br>'
      + 'star 값 (0 ~ 10)<br>'
      + '평점 5점 = 10, 평점 4점 = 8 ...'
    ,
    schema: {
      properties: {
        idxs: {
          example: [],
        },
        star: {
          example: '',
        }
      }
    }
  })
  async starChange(
    @Body('idxs') idxs: [],
    @Body('star') star: string,
  ) {
    return await this.reviewsService.starChange(idxs, star);
  }

  @Patch(':idx')
  @ApiOperation({
    summary: '후기 수정 API',
    description: 'status, star, content, reviewImg 만 변경 가능'
  })
  @Auth(['root', 'admin'])
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
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiBody({
    description: 'review idx를 배열로 전달 ex) [1,2,3]<br>'
      + '관리자 계정의 경우 여러 후기 한번에 삭제 가능<br>'
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
  async remove(
    @GetUser() user: UsersEntity,
    @Body('idxs') idxs: []
  ) {
    await this.reviewsService.remove(idxs, user);
  }
}
