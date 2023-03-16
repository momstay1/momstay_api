"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportCumulativeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const paginate_1 = require("../paginate");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const report_cumulative_entity_1 = require("./entities/report-cumulative.entity");
const report_content_service_1 = require("./report-content.service");
let ReportCumulativeService = class ReportCumulativeService {
    constructor(recuRepository, reconService, userService) {
        this.recuRepository = recuRepository;
        this.reconService = reconService;
        this.userService = userService;
    }
    async create(userInfo, createReportCumulativeDto) {
        const { category, foreignIdx, reportContentIdx, } = createReportCumulativeDto;
        const reportContent = await this.reconService.findOneIdx(reportContentIdx);
        const user = await this.userService.findId(userInfo['id']);
        const rc_data = {
            category,
            foreignIdx,
            reportContent,
            user
        };
        const rcEntity = await this.recuRepository.create(rc_data);
        const reportCumulative = await this.recuRepository.save(rcEntity);
        return { reportCumulative };
    }
    async findAll(options, order) {
        const { take, page } = options;
        const alias = 'reportCumulative';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        const [results, total] = await this.recuRepository.createQueryBuilder('reportCumulative')
            .leftJoinAndSelect('reportCumulative.user', 'user')
            .leftJoinAndSelect('reportCumulative.reportContent', 'reportContent')
            .orderBy(order_by)
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data };
    }
    async findOneIdx(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('reportCumulative.service.findOneIdx: 조회할 정보가 없습니다.');
        }
        const reportCumulative = await this.recuRepository.findOne({
            where: { idx: idx },
            relations: ['reportContent']
        });
        if (!(0, lodash_1.get)(reportCumulative, 'idx', '')) {
            throw new common_1.NotFoundException('reportCumulative.service.findOneIdx: 조회된 신고 내역이 없습니다.');
        }
        return reportCumulative;
    }
    update(id, updateReportCumulativeDto) {
        return `This action updates a #${id} reportCumulative`;
    }
    remove(id) {
        return `This action removes a #${id} reportCumulative`;
    }
};
ReportCumulativeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_cumulative_entity_1.ReportCumulativeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        report_content_service_1.ReportContentService,
        users_service_1.UsersService])
], ReportCumulativeService);
exports.ReportCumulativeService = ReportCumulativeService;
//# sourceMappingURL=report-cumulative.service.js.map