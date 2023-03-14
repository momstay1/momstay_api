import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateReportCumulativeDto {
  @IsString()
  @ApiProperty({ description: '신고 연관된 테이블 정보<br>ex) review(후기신고)' })
  readonly category: string;
  @IsNumber()
  @ApiProperty({ description: '신고 연관된 테이블 idx' })
  readonly foreignIdx: number;
  @IsNumber()
  @ApiProperty({ description: '신고 사유 idx' })
  readonly reportContentIdx: number;
}

