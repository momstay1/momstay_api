import { ReportCumulativeService } from './report-cumulative.service';
import { CreateReportCumulativeDto } from './dto/create-report-cumulative.dto';
import { UpdateReportCumulativeDto } from './dto/update-report-cumulative.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class ReportCumulativeController {
    private readonly reportCumulativeService;
    constructor(reportCumulativeService: ReportCumulativeService);
    create(user: UsersEntity, createReportCumulativeDto: CreateReportCumulativeDto): Promise<{
        reportCumulative: import("./entities/report-cumulative.entity").ReportCumulativeEntity;
    }>;
    findAll(take: number, page: number, order: string): Promise<{
        results: import("./entities/report-cumulative.entity").ReportCumulativeEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    findOne(idx: string): Promise<{
        reportCumulative: import("./entities/report-cumulative.entity").ReportCumulativeEntity;
    }>;
    update(id: string, updateReportCumulativeDto: UpdateReportCumulativeDto): string;
    remove(id: string): string;
}
