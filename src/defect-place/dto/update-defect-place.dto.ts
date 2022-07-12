import { PartialType } from '@nestjs/swagger';
import { CreateDefectPlaceDto } from './create-defect-place.dto';

export class UpdateDefectPlaceDto extends PartialType(CreateDefectPlaceDto) {}
