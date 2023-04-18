import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreatePushNotificationDto {
  @IsOptional()
  @ApiProperty({ description: '앱 푸시 발송 그룹(개별)', required: false })
  readonly topic: string;
  @IsOptional()
  @ApiProperty({ description: '앱 푸시 발송 회원(단체)', required: false })
  readonly userIdx: string;
  @IsOptional()
  @ApiProperty({ description: '앱 푸시 제목' })
  readonly title: string;
  @IsOptional()
  @ApiProperty({ description: '앱 푸시 내용', required: false })
  readonly content: string;
}
