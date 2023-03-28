import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreatePopupDto {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: '팝업 사용 상태 (1: 사용안함, 2: 사용)' })
  readonly status: number;
  @IsString()
  @ApiProperty({ description: '팝업명', required: true })
  readonly title: string;
  @IsOptional()
  @ApiProperty({ description: '노출 페이지', required: false })
  readonly page: string;
  @IsOptional()
  @Matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
  @ApiProperty({ description: '팝업 노출 시작일', required: false })
  readonly startPeriod: string;
  @IsOptional()
  @Matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
  @ApiProperty({ description: '팝업 노출 종료일', required: false })
  readonly endPeriod: string;
  @IsOptional()
  @ApiProperty({ description: '팝업 노출 순위', required: false })
  readonly order: number;
  @IsOptional()
  @ApiProperty({ description: '팝업 링크', required: false })
  readonly link: string;

  @ApiProperty({
    format: 'binary',
    description: '팝업 사진 (최대 1장)',
    required: true,
  })
  readonly popupImg: string[];
}
