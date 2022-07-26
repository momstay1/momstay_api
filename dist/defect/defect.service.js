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
exports.DefectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const paginate_1 = require("../paginate");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const constants_1 = require("./constants");
const defect_entity_1 = require("./entities/defect.entity");
let DefectService = class DefectService {
    constructor(defectRepository, usersService) {
        this.defectRepository = defectRepository;
        this.usersService = usersService;
    }
    getPrivateColumn() {
        const userPrivateColumn = this.usersService.getPrivateColumn();
        return [
            ...constants_1.dftConstant.privateColumn,
            ...userPrivateColumn
        ];
    }
    create(createDefectDto) {
        return 'This action adds a new defect';
    }
    async findAll(place, options, alignment, search) {
        const { take, page } = options;
        const order = {};
        if (alignment['order'] && alignment['sort']) {
            order[constants_1.dftConstant.prefix + '_' + alignment['order']] = alignment['sort'].toUpperCase();
        }
        order['dft_createdAt'] = 'DESC';
        const where = {};
        console.log(search);
        if (search) {
            search = (0, lodash_1.isArray)(search) ? search : [search];
            (0, lodash_1.map)(search, (obj) => {
                if (obj) {
                    const key_val = obj.split(':');
                    where[key_val[0]] = key_val[1];
                }
            });
        }
        const [results, total] = await this.defectRepository.findAndCount({
            order: order,
            where: (qb) => {
                qb.where('dft_place_idx = :dft_place_idx', { dft_place_idx: place });
                (0, lodash_1.get)(where, 'sort1', '') && qb.andWhere('dft_sort1 = :dft_sort1', { dft_sort1: (0, lodash_1.get)(where, 'sort1') });
                (0, lodash_1.get)(where, 'sort2', '') && qb.andWhere('dft_sort2 = :dft_sort2', { dft_sort2: (0, lodash_1.get)(where, 'sort2') });
                (0, lodash_1.get)(where, 'sort3', '') && qb.andWhere('dft_sort3 = :dft_sort3', { dft_sort3: (0, lodash_1.get)(where, 'sort3') });
                (0, lodash_1.get)(where, 'status', '') && qb.andWhere('dft_status = :dft_status', { dft_status: (0, lodash_1.get)(where, 'status') });
                (0, lodash_1.get)(where, 'type', '') && qb.andWhere('dft_type = :dft_type', { dft_type: (0, lodash_1.get)(where, 'type') });
                (0, lodash_1.get)(where, 'shooting_day_lte', '') && qb.andWhere('dft_shooting_day <= :dft_shooting_day_lte', { dft_shooting_day_lte: (0, lodash_1.get)(where, 'shooting_day_lte') });
                (0, lodash_1.get)(where, 'shooting_day_mte', '') && qb.andWhere('dft_shooting_day >= :dft_shooting_day_mte', { dft_shooting_day_mte: (0, lodash_1.get)(where, 'shooting_day_mte') });
                (0, lodash_1.get)(where, 'name', '') && qb.andWhere('user_name = :user_name', { user_name: (0, lodash_1.get)(where, 'name') });
            },
            relations: ['user'],
            take: take,
            skip: take * (page - 1)
        });
        return new paginate_1.Pagination({
            results,
            total,
        });
    }
    async findAllPlace(place_idx) {
        const defect = await this.defectRepository.createQueryBuilder()
            .select('COUNT(dft_place_idx)', 'defect_cnt')
            .addSelect('dft_place_idx')
            .where('dft_place_idx IN (:place_idx)', { place_idx: place_idx })
            .orderBy('dft_createdAt', 'DESC')
            .groupBy('dft_place_idx')
            .getRawMany();
        return defect;
    }
    findOne(id) {
        return `This action returns a #${id} defect`;
    }
    update(id, updateDefectDto) {
        return `This action updates a #${id} defect`;
    }
    remove(id) {
        return `This action removes a #${id} defect`;
    }
};
DefectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(defect_entity_1.DefectEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], DefectService);
exports.DefectService = DefectService;
//# sourceMappingURL=defect.service.js.map