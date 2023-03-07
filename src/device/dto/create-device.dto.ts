import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDeviceDto {

  @IsString()
  @ApiProperty({ description: '토큰 정보' })
  readonly token: string;
  @IsString()
  @ApiProperty({ description: '앱 버전' })
  readonly appVersion: string;
  @IsString()
  @ApiProperty({ description: '운영체제 정보' })
  readonly os: string;
  @IsString()
  @ApiProperty({ description: '운영체제 버전' })
  readonly osVersion: string;
  @IsString()
  @ApiProperty({ description: '접속 환경 (app | web)' })
  readonly environment: string;
  @IsString()
  @ApiProperty({ description: '마케팅 정보 수신 동의 여부 (1: 비동의, 2: 동의)' })
  readonly marketing: string;
  @IsString()
  @ApiProperty({ description: '서비스 정보 수신 동의 여부 (1: 비동의, 2: 동의)' })
  readonly service: string;
}
