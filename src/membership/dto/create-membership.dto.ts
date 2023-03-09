import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateMembershipDto {
  @IsOptional()
  @ApiProperty({ description: '멤버십 신청 상태 (1: 신청, 2: 승인, 3: 종료)' })
  readonly status: number;
  @IsInt()
  @ApiProperty({ description: '멤버십 신청 기간 (1: 1개월, 3: 3개월 ...)' })
  readonly month: number;
  @IsString()
  @ApiProperty({ description: '멤버십 신청 예금자 명' })
  readonly depositor: string;
}
