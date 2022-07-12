import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDefectPlaceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '동' })
  readonly sort1: string;

  @IsString()
  @ApiProperty({ description: '호수' })
  readonly sort2: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '위치' })
  readonly sort3: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '현장 idx' })
  readonly place_idx: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '현장' })
  readonly place: string;
}
