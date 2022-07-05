import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseErrDto {
  @ApiProperty({ description: '에러 상태 코드' })
  readonly statusCode: number;
  @ApiPropertyOptional({ description: '에러 메세지' })
  readonly message: string;
}
