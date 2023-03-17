import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateDeviceDto {

  @IsOptional()
  @ApiProperty({ description: '토큰 정보', required: false })
  readonly token: string;
  @IsOptional()
  @ApiProperty({ description: '앱 버전', required: false })
  readonly appVersion: string;
  @IsOptional()
  @ApiProperty({ description: '운영체제 정보', required: false })
  readonly os: string;
  @IsOptional()
  @ApiProperty({ description: '운영체제 버전', required: false })
  readonly osVersion: string;
  @IsString()
  @ApiProperty({ description: '접속 환경 (android | ios | web)' })
  readonly environment: string;
  @IsString()
  @ApiProperty({ description: '일반 알림 수신 동의 여부 (1: 비동의, 2: 동의)', required: false })
  readonly notification: string;
  @IsString()
  @ApiProperty({ description: '마케팅 정보 수신 동의 여부 (1: 비동의, 2: 동의)', required: false })
  readonly marketing: string;
  @IsString()
  @ApiProperty({ description: '서비스 정보 수신 동의 여부 (1: 비동의, 2: 동의)', required: false })
  readonly service: string;
}
