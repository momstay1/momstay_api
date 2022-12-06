import { PartialType } from '@nestjs/swagger';
import { CreateUserSnsDto } from './create-user-sns.dto';

export class UpdateUserSnsDto extends PartialType(CreateUserSnsDto) { }
