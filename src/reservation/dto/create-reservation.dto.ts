import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateReservationDto {
  @IsNumber()
  @ApiProperty({ description: '방 idx', required: false })
  readonly productOptionIdx: number;
  @IsString()
  @ApiProperty({ description: '방문날짜', required: false })
  readonly visitDate: string;
  @IsString()
  @ApiProperty({ description: '방문시간', required: false })
  readonly visitTime: string;
  @IsString()
  @ApiProperty({ description: '입주날짜', required: false })
  readonly occupancyAt: string;
  @IsString()
  @ApiProperty({ description: '퇴거날짜', required: false })
  readonly evictionAt: string;
  @IsString()
  @ApiProperty({ description: '메세지', required: false })
  readonly memo: string;
}
