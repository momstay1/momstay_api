import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/common.file';
import { GetUser } from 'src/auth/getuser.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';

@Controller('reviews')
@ApiTags('후기 API')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

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

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.reviewsService.findOne(+id);
  }
  
  @Patch(':idx')
  @ApiOperation({ summary: '후기 수정 API' })
  @Auth(['Any'])
  @ApiBearerAuth()
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
