import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReviewDto {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: '후기 상태 (1: 삭제, 2: 등록)' })
  readonly status: number;
  @IsOptional()
  @ApiProperty({ description: '답글 후기의 idx (첫 후기인 경우 backend에서 처리)', required: false })
  readonly group: number;
  @IsOptional()
  @ApiProperty({ description: '후기의 depth (기본값 0, 답글 후기인 경우의 값 1)', required: false })
  readonly depth: number;
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: '평점 (1 ~ 10)' })
  readonly star: number;
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: '숙소 idx' })
  readonly productIdx: number;
  @IsString()
  @ApiProperty({ description: '후기 내용' })
  readonly contents: string;
  // @IsOptional()
  // @ApiProperty({ description: '유지될 파일 idx <br> (ex> 33,34)', required: false })
  // readonly filesIdx: string;

  @IsOptional()
  @ApiProperty({ format: 'binary', description: '후기 사진', required: false })
  readonly reviewImg: string[];
}
