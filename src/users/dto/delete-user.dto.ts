import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty({ description: '아이디' })
  readonly user_ids: Array<string>;
}
