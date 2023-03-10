import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateBannerItemDto {
  @IsOptional()
  @ApiProperty({ description: '배너 아이템 상태 (1: 미사용, 2: 사용) 기본값 2', required: false })
  readonly status: number;
  @IsString()
  @ApiProperty({
    description:
      '배너 아이템 정보 (json형식)<br>'
      + 'ex) [{"title":"제목","link":"외부링크"}]'
  })
  readonly content: string;
  @IsOptional()
  @ApiProperty({ description: '배너 아이템 시작일 ex) 2023-01-01 10:00:00', required: false })
  readonly start: string;
  @IsOptional()
  @ApiProperty({ description: '배너 아이템 종료일 ex) 2023-02-01 23:59:59', required: false })
  readonly end: string;
  @IsString()
  @ApiProperty({ description: '배너 id' })
  readonly bannerId: string;
  @IsOptional()
  @ApiProperty({ format: 'binary', description: '배너 아이템 이미지', required: false })
  readonly bniImg: string[];
}
