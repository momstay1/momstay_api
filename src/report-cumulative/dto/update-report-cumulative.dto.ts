import { PartialType } from '@nestjs/swagger';
import { CreateReportCumulativeDto } from './create-report-cumulative.dto';

export class UpdateReportCumulativeDto extends PartialType(CreateReportCumulativeDto) {}
