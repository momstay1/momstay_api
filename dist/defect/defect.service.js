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
const common_utils_1 = require("../common/common.utils");
const file_service_1 = require("../file/file.service");
const paginate_1 = require("../paginate");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const constants_1 = require("./constants");
const defect_entity_1 = require("./entities/defect.entity");
const place_service_1 = require("../place/place.service");
const common_constants_1 = require("../common/common.constants");
const XLSX = require("xlsx");
const path = require("path");
const moment = require("moment");
let DefectService = class DefectService {
    constructor(defectRepository, usersService, fileService, placeService) {
        this.defectRepository = defectRepository;
        this.usersService = usersService;
        this.fileService = fileService;
        this.placeService = placeService;
    }
    getPrivateColumn() {
        const userPrivateColumn = this.usersService.getPrivateColumn();
        return [
            ...constants_1.dftConstant.privateColumn,
            ...userPrivateColumn
        ];
    }
    async create(user, createDefectDto, files) {
        const addPrefixcreateDefectDto = common_utils_1.commonUtils.addPrefix(constants_1.dftConstant.prefix, createDefectDto);
        addPrefixcreateDefectDto.place = addPrefixcreateDefectDto.dft_place_idx;
        addPrefixcreateDefectDto.user = await this.usersService.findOne(user.user_id);
        const dft = await this.defectRepository.create(Object.assign({}, addPrefixcreateDefectDto));
        await this.defectRepository.save(dft);
        const file_info = await this.fileService.fileInfoInsert(files, dft['dft_idx']);
        return { dft, file_info };
    }
    async findAll(place, options, alignment, search) {
        const { take, page } = options;
        const order = {};
        if (alignment['order'] && alignment['sort']) {
            if (alignment['order'] == 'filename') {
                for (let i = 1; i <= 3; i++) {
                    order[constants_1.dftConstant.prefix + '_sort' + i] = alignment['sort'].toUpperCase();
                }
            }
            else {
                order[constants_1.dftConstant.prefix + '_' + alignment['order']] = alignment['sort'].toUpperCase();
            }
        }
        order['dft_createdAt'] = 'DESC';
        const where = {};
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
    async findAllPlaceCount(place_idx) {
        const defect = await this.defectRepository.createQueryBuilder()
            .select('COUNT(dft_place_idx)', 'defect_cnt')
            .addSelect('dft_place_idx')
            .where('dft_place_idx IN (:place_idx)', { place_idx: place_idx })
            .orderBy('dft_createdAt', 'DESC')
            .groupBy('dft_place_idx')
            .getRawMany();
        return defect;
    }
    async findAllPlaceIdxs(place_idx) {
        const defects = await this.defectRepository.createQueryBuilder()
            .select('*')
            .where('dft_place_idx IN (:place_idx)', { place_idx: place_idx })
            .orderBy('dft_createdAt', 'DESC')
            .getRawMany();
        const dft_idxs = (0, lodash_1.map)(defects, (o) => {
            return o.dft_idx;
        });
        return dft_idxs;
    }
    async findAllPlace(place_idx) {
        return await this.defectRepository.createQueryBuilder()
            .select('*')
            .where('dft_place_idx IN (:place_idx)', { place_idx: place_idx })
            .orderBy('dft_createdAt', 'DESC')
            .getRawMany();
    }
    async excel(place_idx) {
        const defect = await this.findAllPlace(place_idx);
        const place = await this.placeService.findOne(place_idx);
        const array_data = [
            [
                '동',
                '호수',
                '위치',
                '작업상태',
                '하자유형',
                '내용',
                '작업방법',
                '교체면적(m2)',
                '교체면적(장)',
                '등록일'
            ]
        ];
        for (const key in defect) {
            array_data.push([
                (0, lodash_1.get)(defect[key], 'dft_sort1', ''),
                (0, lodash_1.get)(defect[key], 'dft_sort2', ''),
                (0, lodash_1.get)(defect[key], 'dft_sort3', ''),
                (0, lodash_1.get)(constants_1.dftConstant.status, defect[key].dft_status, ''),
                (0, lodash_1.get)(constants_1.dftConstant.type, defect[key].dft_type, ''),
                (0, lodash_1.get)(defect[key], 'dft_content', ''),
                (0, lodash_1.get)(constants_1.dftConstant.work_method, defect[key].dft_work_method, ''),
                (0, lodash_1.get)(defect[key], 'dft_replacement_square_meter', ''),
                (0, lodash_1.get)(defect[key], 'dft_replacement_sheet', ''),
                moment(defect[key].dft_createdAt).format('YYYY-MM-DD hh:mm:ss'),
            ]);
        }
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(array_data);
        worksheet['!cols'] = [
            { wpx: 45 },
            { wpx: 45 },
            { wpx: 45 },
            { wpx: 70 },
            { wpx: 50 },
            { wpx: 400 },
            { wpx: 70 },
            { wpx: 70 },
            { wpx: 70 },
            { wpx: 120 },
        ];
        const file_name = 'defect_excel.xlsx';
        const file_path = path.join(common_constants_1.commonContants.defect_excel_path, file_name);
        console.log({ file_name });
        console.log({ file_path });
        XLSX.utils.book_append_sheet(workbook, worksheet, place.place_name);
        XLSX.writeFile(workbook, file_path);
        return { file_name: file_name, file_path: file_path };
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
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => place_service_1.PlaceService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        file_service_1.FileService,
        place_service_1.PlaceService])
], DefectService);
exports.DefectService = DefectService;
//# sourceMappingURL=defect.service.js.map