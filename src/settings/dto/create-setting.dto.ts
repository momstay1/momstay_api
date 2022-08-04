import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '설정 키값' })
  readonly key: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '설정 값' })
  readonly value: string;
}
