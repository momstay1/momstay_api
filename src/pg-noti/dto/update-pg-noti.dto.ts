import { PartialType } from '@nestjs/swagger';
import { CreatePgNotiDto } from './create-pg-noti.dto';

export class UpdatePgNotiDto extends PartialType(CreatePgNotiDto) {}
