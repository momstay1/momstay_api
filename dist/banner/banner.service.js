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
exports.BannerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const banner_entity_1 = require("./entities/banner.entity");
const file_service_1 = require("../file/file.service");
const common_utils_1 = require("../common/common.utils");
const banner_item_service_1 = require("../banner-item/banner-item.service");
const moment = require("moment");
const registrationStatus = 2;
let BannerService = class BannerService {
    constructor(bannerRepository, bniService, fileService) {
        this.bannerRepository = bannerRepository;
        this.bniService = bniService;
        this.fileService = fileService;
    }
    create(createBannerDto) {
        return 'This action adds a new banner';
    }
    findAll() {
        return `This action returns all banner`;
    }
    async findOne(id) {
        const banner = await this.findOneId(id);
        if ((0, lodash_1.get)(banner, ['itemInfo'], '')) {
            banner['itemInfo'] = JSON.parse(banner['itemInfo']);
        }
        let bni_idxs = [];
        if (banner['bannerItem'].length > 0) {
            const today = moment().format('YYYY-MM-DD HH:ss:mm');
            for (const key in banner['bannerItem']) {
                if (banner['bannerItem'][key]['status'] != registrationStatus
                    || banner['bannerItem'][key]['start'] > today
                    || banner['bannerItem'][key]['end'] < today) {
                    delete banner['bannerItem'][key];
                }
                else {
                    bni_idxs.push(banner['bannerItem'][key]['idx']);
                }
            }
        }
        let file_info = {};
        try {
            file_info = await this.fileService.findCategoryForeignAll(['bniImg'], bni_idxs);
            file_info = common_utils_1.commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
        }
        catch (error) {
            console.log('배너 아이템 이미지 파일 없음');
        }
        return { banner, file_info };
    }
    async findOneId(id) {
        if (!id) {
            throw new common_1.NotFoundException('배너 아이디 정보가 없습니다.');
        }
        const banner = await this.bannerRepository.findOne({
            where: { id: id, status: registrationStatus },
            relations: ['bannerItem']
        });
        if (!(0, lodash_1.get)(banner, 'idx', '')) {
            throw new common_1.NotFoundException('조회된 배너가 없습니다.');
        }
        return banner;
    }
    update(id, updateBannerDto) {
        return `This action updates a #${id} banner`;
    }
    remove(id) {
        return `This action removes a #${id} banner`;
    }
};
BannerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(banner_entity_1.BannerEntity)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => banner_item_service_1.BannerItemService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        banner_item_service_1.BannerItemService,
        file_service_1.FileService])
], BannerService);
exports.BannerService = BannerService;
//# sourceMappingURL=banner.service.js.map