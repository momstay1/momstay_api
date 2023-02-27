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
exports.CollegeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const paginate_1 = require("../paginate");
const typeorm_2 = require("typeorm");
const college_entity_1 = require("./entities/college.entity");
let CollegeService = class CollegeService {
    constructor(collegeRepository) {
        this.collegeRepository = collegeRepository;
    }
    create(createCollegeDto) {
        return 'This action adds a new college';
    }
    async findAll(options, search) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        const [results, total] = await this.collegeRepository.createQueryBuilder('college')
            .where(qb => {
            if ((0, lodash_1.get)(where, 'name', '')) {
                qb.where('('
                    + '`college`.nameKor LIKE :name '
                    + 'OR `college`.nameEng LIKE :name '
                    + 'OR `college`.nameJpn LIKE :name '
                    + 'OR `college`.nameChn LIKE :name'
                    + ')', { name: '%' + (0, lodash_1.get)(where, 'name') + '%' });
            }
        })
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        return new paginate_1.Pagination({
            results,
            total,
        });
    }
    async findAllIdx(idxs) {
        if (idxs.length <= 0) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const metro = await this.collegeRepository.find({
            where: { idx: (0, typeorm_2.In)(idxs) }
        });
        if (metro.length <= 0) {
            throw new common_1.NotFoundException('조회된 대학교 정보가 없습니다.');
        }
        return metro;
    }
    findOne(id) {
        return `This action returns a #${id} college`;
    }
    update(id, updateCollegeDto) {
        return `This action updates a #${id} college`;
    }
    remove(id) {
        return `This action removes a #${id} college`;
    }
};
CollegeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(college_entity_1.CollegeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CollegeService);
exports.CollegeService = CollegeService;
//# sourceMappingURL=college.service.js.map