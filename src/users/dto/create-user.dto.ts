import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty({ description: '아이디' })
  readonly id: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty({ description: '이름' })
  readonly name: string;

  @IsOptional()
  @IsEmpty()
  @IsString()
  @IsEmail()
  @ApiPropertyOptional({ description: '이메일' })
  readonly email: string;

  @IsString()
  @Matches(/^[a-z\d!@#$%^&*()]{8,30}$/)
  @ApiProperty({ description: '비밀번호' })
  readonly password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '회원 타입' })
  readonly type: string;
}
