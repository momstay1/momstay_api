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
exports.DefectPlaceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_utils_1 = require("../common/common.utils");
const paginate_1 = require("../paginate");
const place_service_1 = require("../place/place.service");
const typeorm_2 = require("typeorm");
const constants_1 = require("./constants");
const defect_place_entity_1 = require("./entities/defect-place.entity");
const XLSX = require("xlsx");
const path = require("path");
let DefectPlaceService = class DefectPlaceService {
    constructor(dfpRepository, placeService, connection) {
        this.dfpRepository = dfpRepository;
        this.placeService = placeService;
        this.connection = connection;
    }
    getPrivateColumn() {
        return constants_1.dfpConstant.privateColumn;
    }
    async create(createDefectPlaceDto) {
        const place = await this.placeService.findOne(Number(createDefectPlaceDto.place_idx));
        const addPrefixdfpDto = common_utils_1.commonUtils.addPrefix(constants_1.dfpConstant.prefix, createDefectPlaceDto);
        addPrefixdfpDto.place = place;
        const dfp = await this.dfpRepository.create(addPrefixdfpDto);
        return await this.dfpRepository.save(dfp);
    }
    async findAll(place, options) {
        const { take, page } = options;
        const [results, total] = await this.dfpRepository.findAndCount({
            order: { dfp_sort1: 'ASC', dfp_sort2: 'ASC' },
            where: { dfp_place_idx: place },
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
            throw new common_1.NotFoundException('존재하지 않는 하자현장 입니다.');
        }
        const dfp = await this.dfpRepository.findOne({
            where: { dfp_idx: idx },
            relations: ['place'],
        });
        if (!dfp) {
            throw new common_1.NotFoundException('존재하지 않는 하자현장 입니다.');
        }
        return dfp;
    }
    async update(idx, updateDefectPlaceDto) {
        const addPrefixdfpDto = common_utils_1.commonUtils.addPrefix(constants_1.dfpConstant.prefix, updateDefectPlaceDto);
        addPrefixdfpDto.dfp_idx = idx;
        return await this.dfpRepository.save(addPrefixdfpDto);
    }
    remove(id) {
        return `This action removes a #${id} defectPlace`;
    }
    async removes(idxs) {
        if (idxs.length <= 0) {
            throw new common_1.NotFoundException('삭제할 정보가 없습니다.');
        }
        await this.dfpRepository.createQueryBuilder()
            .delete()
            .where(" dfp_idx IN (:idxs)", { idxs: idxs })
            .execute();
    }
    async uploadExcel(idx, excel) {
        const excelInfo = excel.originalname.split(".");
        if (excelInfo[1] != 'xlsx') {
            throw new common_1.UnauthorizedException('잘못된 형식의 파일입니다.');
        }
        const workbook = XLSX.read(excel.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, {
            defval: null,
        });
        await this.connection.transaction(async (manager) => {
            const dfpCreateDto = [];
            for (const row of rows) {
                const values = Object.keys(row).map(key => row[key]);
                dfpCreateDto.push({
                    dfp_sort1: values[0],
                    dfp_sort2: values[1],
                    dfp_sort3: values[2],
                    dfp_place_idx: idx,
                    place: idx
                });
            }
            const dfp = await this.dfpRepository.create(dfpCreateDto);
            await manager.save(dfp);
        });
    }
    async sampleExcel(res) {
        const filename = 'defect-place.xlsx';
        const filepath = path.join(__dirname, '..', '..', 'data', 'sample', filename);
        res.download(filepath, filename);
    }
};
DefectPlaceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(defect_place_entity_1.DefectPlaceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        place_service_1.PlaceService,
        typeorm_2.Connection])
], DefectPlaceService);
exports.DefectPlaceService = DefectPlaceService;
//# sourceMappingURL=defect-place.service.js.map