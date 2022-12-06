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
  @ApiPropertyOptional({ description: '연락처' })
  readonly phone: string;

  @IsOptional()
  @ApiPropertyOptional({ description: '생일' })
  readonly birthday: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '회원 메모' })
  readonly memo: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '회원 본인인증 고유키' })
  readonly uniqueKey: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '회원 본인인증 정보' })
  readonly certifiInfo: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '회원 그룹' })
  readonly group: number[];

  @IsOptional()
  @ApiProperty({ description: '회원 가입 유형' })
  readonly snsInfo: string;

  @IsOptional()
  @ApiProperty({ format: 'binary', description: '회원 프로필' })
  readonly profile: string;
}
