import { PartialType } from '@nestjs/swagger';
import { CreatePgCancelDto } from './create-pg-cancel.dto';

export class UpdatePgCancelDto extends PartialType(CreatePgCancelDto) {}
