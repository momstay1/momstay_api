import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateMembershipDto } from './create-membership.dto';

export class UpdateMembershipDto extends PartialType(CreateMembershipDto) {
  @IsOptional()
  @ApiProperty({ description: '멤버십 신청 상태 변경 (2: 승인, 3: 종료, 기본값: 2)' })
  readonly status: number;
  @IsOptional()
  @ApiProperty({ description: '멤버십 신청 기간 변경 (1: 1개월, 3: 3개월 ...)<br>값 없는 경우 이전에 저장된 값으로 설정' })
  readonly month: number;
}
