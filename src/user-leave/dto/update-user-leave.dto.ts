import { PartialType } from '@nestjs/swagger';
import { CreateUserLeaveDto } from './create-user-leave.dto';

export class UpdateUserLeaveDto extends PartialType(CreateUserLeaveDto) {}
