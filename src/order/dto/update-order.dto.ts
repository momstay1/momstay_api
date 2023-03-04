import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  readonly adminMemo: string;
  @IsOptional()
  @ApiProperty({ description: '구매상품(방) idx' })
  readonly productOptionIdx: string;
  @IsOptional()
  @ApiProperty({ description: '취소 사유', required: false })
  readonly cancelReason: string;
}
