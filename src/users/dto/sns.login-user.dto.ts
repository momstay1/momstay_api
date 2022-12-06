import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SnsLoginUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty({ description: '아이디' })
  readonly id: string;
}
