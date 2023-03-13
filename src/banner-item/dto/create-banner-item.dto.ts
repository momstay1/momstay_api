import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateBannerItemDto {
  @IsString()
  @ApiProperty({
    description:
      '배너 아이템 정보 (json형식)<br>'
      + 'status 배너 아이템 상태 ex) {"status":2} (1: 미사용, 2: 사용) 기본값 2<br>'
      + 'start 배너 아이템 시작일 ex) {"start":"2023-01-01 10:00:00"}<br>'
      + 'end 배너 아이템 종료일 ex) {"end":"2023-02-01 23:59:59"}<br>'
      + 'file_name 배너 아이템 첨부파일 ex) {"file_name":"파일명"}<br>'
      + 'ex) [{"title":"제목","status":2,"link":"외부링크"}]'
  })
  readonly content: string;
  @IsString()
  @ApiProperty({ description: '배너 id' })
  readonly bannerId: string;
  @IsOptional()
  @ApiProperty({ format: 'binary', description: '배너 아이템 이미지', required: false })
  readonly bniImg: string[];
}
