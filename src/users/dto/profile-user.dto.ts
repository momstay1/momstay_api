import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileUserDto {
  @ApiProperty({ description: '아이디' })
  readonly idx: number;

  @ApiProperty({ description: '아이디' })
  readonly id: string;

  @ApiProperty({ description: '이름' })
  readonly name: string;

  @ApiPropertyOptional({ description: '이메일' })
  readonly email: string;

  @ApiProperty({ description: '생성날짜' })
  readonly createdAt: Date;

  @ApiProperty({ description: '수정날짜' })
  readonly updateddAt: Date;
}
