import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReportCumulativeDto } from './dto/create-report-cumulative.dto';
import { UpdateReportCumulativeDto } from './dto/update-report-cumulative.dto';
import { ReportCumulativeEntity } from './entities/report-cumulative.entity';
import { ReportContentService } from './report-content.service';
export declare class ReportCumulativeService {
    private recuRepository;
    private readonly reconService;
    private readonly userService;
    constructor(recuRepository: Repository<ReportCumulativeEntity>, reconService: ReportContentService, userService: UsersService);
    create(userInfo: UsersEntity, createReportCumulativeDto: CreateReportCumulativeDto): Promise<{
        reportCumulative: ReportCumulativeEntity;
    }>;
    findAll(options: PaginationOptions, order: string): Promise<{
        data: Pagination<ReportCumulativeEntity>;
    }>;
    findOneIdx(idx: number): Promise<ReportCumulativeEntity>;
    update(id: number, updateReportCumulativeDto: UpdateReportCumulativeDto): string;
    remove(id: number): string;
}
