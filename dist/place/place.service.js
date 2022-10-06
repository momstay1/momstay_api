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
exports.PlaceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const defect_service_1 = require("../defect/defect.service");
const paginate_1 = require("../paginate");
const typeorm_2 = require("typeorm");
const constants_1 = require("./constants");
const place_entity_1 = require("./entities/place.entity");
let PlaceService = class PlaceService {
    constructor(placeRepository, defectService) {
        this.placeRepository = placeRepository;
        this.defectService = defectService;
    }
    getPrivateColumn() {
        return constants_1.placeConstant.privateColumn;
    }
    async create(createPlaceDto) {
        const place = await this.checkPlaceExists(createPlaceDto.name);
        if (place && place.place_status != constants_1.placeConstant.status.delete) {
            throw new common_1.UnprocessableEntityException('현장 이름이 중복 됩니다.');
        }
        return await this.savePlace(createPlaceDto);
        ;
    }
    async findAll(options) {
        const exception_status = [constants_1.placeConstant.status.delete];
        const status_arr = await this.getStatus(exception_status);
        const { take, page } = options;
        const [results, total] = await this.placeRepository.findAndCount({
            order: { place_createdAt: 'DESC' },
            where: { place_status: (0, typeorm_2.In)(status_arr) },
            take: take,
            skip: take * (page - 1)
        });
        return new paginate_1.Pagination({
            results,
            total,
        });
    }
    async findAllDefect(options) {
        const places = await this.findAll(options);
        const place_idxs = (0, lodash_1.map)(places.results, (obj) => {
            return obj.place_idx;
        });
        const dft_place_cnt = (0, lodash_1.keyBy)(await this.defectService.findAllPlaceCount(place_idxs), (o) => {
            return o.dft_place_idx;
        });
        console.log({ dft_place_cnt });
        places.results = (0, lodash_1.map)(places.results, (obj) => {
            obj['place_defect_cnt'] = (0, lodash_1.get)(dft_place_cnt, [obj.place_idx, 'defect_cnt'], 0);
            return obj;
        });
        return places;
    }
    async findOne(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('존재하지 않는 현장 입니다.');
        }
        const place = await this.placeRepository.findOne({
            where: { place_idx: idx },
            relations: ['defect_place'],
        });
        if (!place) {
            throw new common_1.NotFoundException('존재하지 않는 현장 입니다.');
        }
        const dftp = {};
        if ((0, lodash_1.get)(place, 'defect_place')) {
            const dfp = (0, lodash_1.get)(place, ['defect_place'], []);
            for (const object of dfp) {
                const sort1 = object.dfp_sort1.replace(/[^0-9]/g, "");
                if (!(0, lodash_1.get)(dftp, [sort1], '')) {
                    dftp[sort1] = {};
                }
                dftp[sort1][object.dfp_idx] = { sort2: object.dfp_sort2, sort3: object.dfp_sort3 };
            }
        }
        return place;
    }
    async getDefectPlace(defect_place) {
        const dftp = {};
        if (defect_place) {
            const dfp = defect_place;
            for (const object of dfp) {
                const sort1 = object.dfp_sort1.replace(/[^0-9]/g, "");
                if (!(0, lodash_1.get)(dftp, [sort1], '')) {
                    dftp[sort1] = {};
                }
                dftp[sort1][object.dfp_idx] = { sort2: object.dfp_sort2, sort3: object.dfp_sort3 };
            }
        }
        return dftp;
    }
    async update(idx, updatePlaceDto) {
        const place = await this.findOne(idx);
        const existPlace = await this.checkPlaceExists(updatePlaceDto.name);
        if (existPlace) {
            throw new common_1.NotAcceptableException('중복된 현장명이 존재합니다.');
        }
        place.place_status = Number(updatePlaceDto.status);
        place.place_name = updatePlaceDto.name;
        place.place_addr = updatePlaceDto.addr;
        place.place_memo = updatePlaceDto.memo;
        return await this.placeRepository.save(place);
    }
    async remove(idx) {
        const place = await this.findOne(idx);
        place.place_status = constants_1.placeConstant.status.delete;
        await this.placeRepository.save(place);
    }
    async removes(idxs) {
        if (idxs.length <= 0) {
            throw new common_1.NotFoundException('삭제할 정보가 없습니다.');
        }
        await this.placeRepository.createQueryBuilder()
            .update(place_entity_1.PlaceEntity)
            .set({ place_status: constants_1.placeConstant.status.delete })
            .where(" place_idx IN (:idxs)", { idxs: idxs })
            .execute();
    }
    async statusUpdate(idxs, status) {
        await this.placeRepository.createQueryBuilder()
            .update(place_entity_1.PlaceEntity)
            .set({ place_status: Number(status) })
            .where(" place_idx IN (:idxs)", { idxs: idxs })
            .execute();
    }
    async checkPlaceExists(name) {
        return await this.placeRepository.findOne({ place_name: name });
    }
    async savePlace(createPlaceDto) {
        const addPrefixPlaceDto = common_utils_1.commonUtils.addPrefix(constants_1.placeConstant.prefix, createPlaceDto);
        addPrefixPlaceDto.place_status
            = (0, lodash_1.get)(addPrefixPlaceDto, 'place_status')
                ? (0, lodash_1.get)(addPrefixPlaceDto, 'place_status')
                : constants_1.placeConstant.default.status;
        addPrefixPlaceDto.place_type
            = (0, lodash_1.get)(addPrefixPlaceDto, 'place_type')
                ? (0, lodash_1.get)(addPrefixPlaceDto, 'place_type')
                : constants_1.placeConstant.default.type;
        const place = await this.placeRepository.create(Object.assign({}, addPrefixPlaceDto));
        return await this.placeRepository.save(place);
    }
    async getStatus(exceptionStatus) {
        const status_arr = [];
        for (const key in constants_1.placeConstant.status) {
            if (!exceptionStatus.includes(constants_1.placeConstant.status[key])) {
                status_arr.push(constants_1.placeConstant.status[key]);
            }
        }
        return status_arr;
    }
};
PlaceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(place_entity_1.PlaceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        defect_service_1.DefectService])
], PlaceService);
exports.PlaceService = PlaceService;
//# sourceMappingURL=place.service.js.map