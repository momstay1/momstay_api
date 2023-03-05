import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @IsOptional()
  @ApiProperty({ description: '유지될 파일 idx <br> (ex> 33,34)', required: false })
  readonly filesIdx: string;
}
