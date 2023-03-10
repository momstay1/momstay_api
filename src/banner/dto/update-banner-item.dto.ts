import { PartialType } from '@nestjs/swagger';
import { CreateBannerItemDto } from './create-banner-item.dto';

export class UpdateBannerItemDto extends PartialType(CreateBannerItemDto) { }
