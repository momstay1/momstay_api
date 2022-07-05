import { PartialType } from '@nestjs/swagger';
import { CreateBoardContentDto } from './create-board-content.dto';

export class UpdateBoardContentDto extends PartialType(CreateBoardContentDto) {}
