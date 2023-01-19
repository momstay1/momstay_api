import { PartialType } from '@nestjs/swagger';
import { CreateUserDormantDto } from './create-user-dormant.dto';

export class UpdateUserDormantDto extends PartialType(CreateUserDormantDto) {}
