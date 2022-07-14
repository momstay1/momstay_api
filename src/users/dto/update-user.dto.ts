import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: '상태' })
  readonly status: string;
  @ApiPropertyOptional({ description: '타입' })
  readonly type: string;
  @ApiPropertyOptional({ description: '비밀번호' })
  readonly password: string;
  @ApiProperty({ description: '이름' })
  readonly name: string;
  @ApiProperty({ description: '연락처' })
  readonly phone: string;
  @ApiProperty({ description: '메모' })
  readonly memo: string;
  @ApiProperty({ description: '그룹' })
  readonly group: string;
}
