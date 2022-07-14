import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty({ description: '아이디' })
  readonly ids: Array<string>;
}
