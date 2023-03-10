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
exports.MetroService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const paginate_1 = require("../paginate");
const typeorm_2 = require("typeorm");
const metro_entity_1 = require("./entities/metro.entity");
let MetroService = class MetroService {
    constructor(metroRepository) {
        this.metroRepository = metroRepository;
    }
    create(createMetroDto) {
        return 'This action adds a new metro';
    }
    async findAll(options, search) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        const [results, total] = await this.metroRepository.createQueryBuilder('metro')
            .where(qb => {
            if ((0, lodash_1.get)(where, 'station', '')) {
                qb.where('('
                    + '`metro`.stationKor LIKE :name '
                    + 'OR `metro`.stationEng LIKE :name '
                    + 'OR `metro`.stationJpn LIKE :name '
                    + 'OR `metro`.stationChn LIKE :name'
                    + ')', { name: '%' + (0, lodash_1.get)(where, 'station') + '%' });
            }
        })
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        return new paginate_1.Pagination({
            results,
            total,
            page,
        });
    }
    async findAllIdx(idxs) {
        if (idxs.length <= 0) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const metro = await this.metroRepository.find({
            where: { idx: (0, typeorm_2.In)(idxs) }
        });
        if (metro.length <= 0) {
            throw new common_1.NotFoundException('조회된 지하철 정보가 없습니다.');
        }
        return metro;
    }
    findOne(id) {
        return `This action returns a #${id} metro`;
    }
    update(id, updateMetroDto) {
        return `This action updates a #${id} metro`;
    }
    remove(id) {
        return `This action removes a #${id} metro`;
    }
};
MetroService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(metro_entity_1.MetroEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MetroService);
exports.MetroService = MetroService;
//# sourceMappingURL=metro.service.js.map