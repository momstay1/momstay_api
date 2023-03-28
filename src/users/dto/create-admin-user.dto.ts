import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEmpty,
  isNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAdminUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '회원 타입' })
  readonly type: string;

  @IsOptional()
  @ApiProperty({ description: '상태<br>(0:회원 삭제, 1: 회원 미인증, 2: 회원 등록, 5: 회원 휴면, 9: 회원 탈퇴)' })
  readonly status: number;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty({ description: '아이디' })
  readonly id: string;

  @IsOptional()
  @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/)
  @ApiProperty({ description: '비밀번호' })
  readonly password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty({ description: '이름' })
  readonly name: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ description: '이메일' })
  readonly email: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '국가번호' })
  readonly countryCode: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '연락처' })
  readonly phone: string;

  @IsOptional()
  @ApiPropertyOptional({ description: '생일' })
  readonly birthday: Date;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '가입언어' })
  readonly language: string;

  @IsOptional()
  @ApiPropertyOptional({ description: '성별' })
  readonly gender: string;

  @IsOptional()
  @ApiPropertyOptional({ description: '직장 또는 학교' })
  readonly other: string;

  @IsOptional()
  @ApiProperty({ description: '회원 메모', required: false })
  readonly memo: string;

  @IsOptional()
  @ApiProperty({ description: '회원 본인인증 고유키', required: false })
  readonly uniqueKey: string;

  @IsOptional()
  @ApiProperty({ description: '회원 본인인증 정보 (json형태)', required: false })
  readonly certifiInfo: string;

  @IsOptional()
  @ApiProperty({ description: '회원 마케팅 동의 여부 <br>(1: 비동의, 2: 동의)' })
  readonly marketing: string;

  @IsOptional()
  @ApiProperty({ description: '회원 그룹' })
  readonly group: number;

  // @ApiProperty({ description: '회원 가입 유형' })
  // readonly snsInfo: string;

  @IsOptional()
  @ApiProperty({ format: 'binary', description: '회원 프로필', required: false })
  readonly profile: string;
}
