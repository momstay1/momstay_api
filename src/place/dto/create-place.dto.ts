import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '상태' })
  readonly status: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '타입' })
  readonly type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '현장명' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '주소' })
  readonly addr: string;

  @IsString()
  @ApiProperty({ description: '내용' })
  readonly memo: string;
}
