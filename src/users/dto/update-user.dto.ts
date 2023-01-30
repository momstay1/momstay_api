import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
  @ApiProperty({ description: '회원 타입', required: false })
  readonly type: string;

  @IsOptional()
  @ApiProperty({ description: '상태', required: false })
  readonly status: number;

  @IsOptional()
  @ApiProperty({ description: '아이디', required: false })
  readonly id: string;

  @IsOptional()
  @ApiProperty({ description: '비밀번호', required: false })
  readonly password: string;

  @IsOptional()
  @ApiProperty({ description: '이름', required: false })
  readonly name: string;

  @IsOptional()
  @ApiProperty({ description: '회원 본인인증 고유키', required: false })
  readonly uniqueKey: string;

  @IsOptional()
  @ApiProperty({ description: '회원 본인인증 정보 (json형태)', required: false })
  readonly certifiInfo: string;

  @IsOptional()
  @ApiProperty({ description: '회원 마케팅 동의 여부 <br>(1: 비동의, 2: 동의', required: false })
  readonly marketing: string;

  @IsOptional()
  @ApiProperty({ description: '회원 그룹', required: false })
  readonly group: number[];
}
