import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResponseErrDto } from './response-err.dto';

export class ResponseErrorDto extends ResponseErrDto {
  @ApiProperty({ description: '에러 내용' })
  readonly error: string;
}
