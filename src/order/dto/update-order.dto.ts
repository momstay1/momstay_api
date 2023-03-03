import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsOptional()
  @ApiProperty({ description: '취소 사유', required: false })
  readonly cancelReason: string;
}
