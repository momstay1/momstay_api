import { PartialType } from '@nestjs/swagger';
import { CreatePgDatumDto } from './create-pg-datum.dto';

export class UpdatePgDatumDto extends PartialType(CreatePgDatumDto) {}
