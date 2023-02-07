import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty({ description: '아이디' })
  readonly id: string;

  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/)
  @ApiProperty({ description: '비밀번호' })
  readonly password: string;
}
