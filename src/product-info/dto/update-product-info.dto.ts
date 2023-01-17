import { PartialType } from '@nestjs/swagger';
import { CreateProductInfoDto } from './create-product-info.dto';

export class UpdateProductInfoDto extends PartialType(CreateProductInfoDto) {}
