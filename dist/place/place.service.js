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
const paginate_1 = require("../paginate");
const typeorm_2 = require("typeorm");
const constants_1 = require("./constants");
const place_entity_1 = require("./entities/place.entity");
let PlaceService = class PlaceService {
    constructor(placeRepository) {
        this.placeRepository = placeRepository;
    }
    getPrivateColumn() {
        return constants_1.placeConstant.privateColumn;
    }
    async create(createPlaceDto) {
        const place = await this.checkPlaceExists(createPlaceDto.name);
        if (place) {
            throw new common_1.UnprocessableEntityException('현장 이름이 중복 됩니다.');
        }
        return await this.savePlace(createPlaceDto);
        ;
    }
    async findAll(options) {
        const status_arr = [];
        for (const key in constants_1.placeConstant.status) {
            if (key != 'delete') {
                status_arr.push(constants_1.placeConstant.status[key]);
            }
        }
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
    async findOne(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('존재하지 않는 현장 입니다.');
        }
        const place = await this.placeRepository.findOne({
            where: { place_idx: idx },
        });
        if (!place) {
            throw new common_1.NotFoundException('존재하지 않는 현장 입니다.');
        }
        return place;
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
};
PlaceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(place_entity_1.PlaceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlaceService);
exports.PlaceService = PlaceService;
//# sourceMappingURL=place.service.js.map