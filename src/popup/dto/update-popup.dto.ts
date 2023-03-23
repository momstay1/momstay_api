import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreatePopupDto } from './create-popup.dto';

export class UpdatePopupDto extends PartialType(CreatePopupDto) {
  @IsOptional()
  @ApiProperty({
    description: '유지될 파일 idx <br> (ex> 33,34)',
    required: false,
  })
  readonly filesIdx: string;
}
