import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateBoardDto {
  @IsNumber()
  @IsOptional()
  readonly status: number;

  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsNumber()
  readonly order: number;
}
