import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsArray } from "class-validator";

export class CreateSettingDto {
  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({ description: '설정 키값' })
  // readonly key: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: '설정 값' })
  readonly settings: Array<object>;
}
