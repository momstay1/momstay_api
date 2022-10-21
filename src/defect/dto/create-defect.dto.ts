import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsOptional, IsString } from "class-validator";

export class CreateDefectDto {
  @IsString()
  @ApiProperty({ description: '현장 idx' })
  readonly place_idx: string;

  @IsString()
  @ApiProperty({ description: '동' })
  readonly sort1: string;
  @IsString()
  @ApiProperty({ description: '호수' })
  readonly sort2: string;
  @IsString()
  @ApiProperty({ description: '위치' })
  readonly sort3: string;
  @IsString()
  @ApiProperty({ description: '작업상태' })
  readonly status: string;
  @IsString()
  @ApiProperty({ description: '하자유형' })
  readonly type: string;
  @IsString()
  @ApiProperty({ description: '내용' })
  readonly content: string;
  @IsString()
  @ApiProperty({ description: '작업방법' })
  readonly work_method: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ description: '교체면적(m)' })
  readonly replacement_square_meter: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ description: '교체면적(장)' })
  readonly replacement_sheet: string;
  @IsDateString()
  @ApiProperty({ description: '사진촬영일' })
  readonly shooting_day: string;
  @IsString()
  @ApiProperty({ description: '단말기 고유 번호' })
  readonly device_key: string;
  @ApiProperty({ description: '원본 이미지' })
  readonly dft_origin_img: any;
  @ApiProperty({ description: '정보 표시된 이미지' })
  readonly dft_info_img: any;
}
