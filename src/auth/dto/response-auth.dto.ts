import { ApiProperty } from '@nestjs/swagger';

export class ResponseAuthDto {
  @ApiProperty({ description: 'jwt 토큰' })
  readonly access_token: string;
  @ApiProperty({ description: 'refresh 토큰' })
  readonly refresh_token: string;
}
