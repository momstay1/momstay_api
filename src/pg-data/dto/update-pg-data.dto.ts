import { PartialType } from '@nestjs/swagger';
import { CreatePgDatumDto } from './create-pg-data.dto';

export class UpdatePgDatumDto extends PartialType(CreatePgDatumDto) { }
