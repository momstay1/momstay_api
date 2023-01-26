import { PartialType } from '@nestjs/swagger';
import { CreateMetroDto } from './create-metro.dto';

export class UpdateMetroDto extends PartialType(CreateMetroDto) {}
