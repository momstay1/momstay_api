import { Repository } from 'typeorm';
import { ReportContentEntity } from './entities/report-content.entity';
export declare class ReportContentService {
    private reconRepository;
    constructor(reconRepository: Repository<ReportContentEntity>);
    findAll(): string;
    findGroup(group: string): Promise<ReportContentEntity[]>;
    findOne(idx: number): Promise<{
        reportContent: ReportContentEntity;
    }>;
    findOneIdx(idx: number): Promise<ReportContentEntity>;
    remove(id: number): string;
}
