import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional, Matches } from 'class-validator';

export class CreatePopupDto {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: '팝업 사용 상태 (1: 삭제, 2: 등록)' })
  readonly status: number;
  @IsDefined()
  @ApiProperty({ description: '팝업명', required: true })
  readonly title: string;
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
  @IsDefined()
  @ApiProperty({ format: 'binary', description: '팝업 사진', required: true })
  readonly popupImg: string;
}
