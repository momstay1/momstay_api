import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateBlockDto {
  @IsNumber()
  @ApiProperty({ description: '차단할 회원 idx' })
  blockUserIdx: number
}
