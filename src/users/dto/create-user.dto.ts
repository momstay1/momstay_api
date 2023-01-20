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

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: '회원 타입' })
  readonly type: string;

  @IsOptional()
  @ApiProperty({ description: '상태' })
  readonly status: number;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty({ description: '아이디' })
  readonly id: string;

  @IsOptional()
  @Matches(/^[a-z\d!@#$%^&*()]{8,30}$/)
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
  @ApiProperty({ description: '회원 메모' })
  readonly memo: string;

  @IsOptional()
  @ApiProperty({ description: '회원 본인인증 고유키' })
  readonly uniqueKey: string;

  @IsOptional()
  @ApiProperty({ description: '회원 본인인증 정보 (json형태)' })
  readonly certifiInfo: string;

  @IsOptional()
  @ApiProperty({ description: '회원 그룹' })
  readonly group: number[];

  // @ApiProperty({ description: '회원 가입 유형' })
  // readonly snsInfo: string;

  @IsOptional()
  @ApiProperty({ format: 'binary', description: '회원 프로필', required: false })
  readonly profile: string;
}
