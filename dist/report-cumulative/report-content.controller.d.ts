import { ReportContentService } from './report-content.service';
export declare class ReportContentController {
    private readonly reportContentService;
    constructor(reportContentService: ReportContentService);
    findAll(): string;
    findGroup(group: string): Promise<{
        reportContent: import("./entities/report-content.entity").ReportContentEntity[];
    }>;
    findOne(idx: string): Promise<{
        reportContent: import("./entities/report-content.entity").ReportContentEntity;
    }>;
}
