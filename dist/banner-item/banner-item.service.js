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
exports.BannerItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const banner_service_1 = require("../banner/banner.service");
const common_utils_1 = require("../common/common.utils");
const file_service_1 = require("../file/file.service");
const typeorm_2 = require("typeorm");
const banner_item_entity_1 = require("./entities/banner-item.entity");
const registrationStatus = 2;
const categoryName = 'bniImg';
let BannerItemService = class BannerItemService {
    constructor(bniRepository, bannerService, fileService) {
        this.bniRepository = bniRepository;
        this.bannerService = bannerService;
        this.fileService = fileService;
    }
    async create(createBannerItemDto, files) {
        console.log(files[categoryName]);
        const { bannerId } = createBannerItemDto;
        const bannerInfo = await this.bannerService.findOneId(bannerId);
        let del_bni;
        if (bannerInfo['bannerItem']) {
            del_bni = common_utils_1.commonUtils.getArrayKey(bannerInfo['bannerItem'], ['idx'], true);
        }
        let bni_content = JSON.parse((0, lodash_1.get)(createBannerItemDto, 'content'));
        bni_content = (0, lodash_1.isArray)(bni_content) ? bni_content : [];
        for (const key in bni_content) {
            const content = (0, lodash_1.cloneDeep)(bni_content[key]);
            if ((0, lodash_1.get)(content, 'file_order', -1) >= 0)
                delete content['file_order'];
            const bni_data = {
                status: +(0, lodash_1.get)(content, 'status', registrationStatus),
                order: +(0, lodash_1.get)(content, 'order', key),
                content: JSON.stringify(content),
                start: (0, lodash_1.get)(content, 'start', '0'),
                end: (0, lodash_1.get)(content, 'end', '0'),
                banner: bannerInfo
            };
            const bni = { update_idx: 0 };
            if ((0, lodash_1.get)(content, ['section_idx'], '')) {
                bni['update_idx'] = bni_data['idx'] = content['section_idx'];
            }
            const bannerItemEntity = await this.bniRepository.create(bni_data);
            const bannerItem = await this.bniRepository.save(bannerItemEntity);
            if ((0, lodash_1.get)(del_bni, [bannerItem['idx']], ''))
                delete del_bni[bannerItem['idx']];
            bannerItem['content'] = JSON.parse(bannerItem['content']);
            if (!(0, lodash_1.get)(bannerItem, ['content', 'section_idx'], '')) {
                bannerItem['content']['section_idx'] = bannerItem['idx'];
                bannerItem['content'] = JSON.stringify(bannerItem['content']);
                await this.bniRepository.save(bannerItem);
            }
            if ((0, lodash_1.get)(bni_content, [key, 'file_order'], -1) >= 0) {
                const file = {};
                file[categoryName] = [];
                bni_content[key]['file_order'] = (0, lodash_1.isArray)(bni_content[key]['file_order']) ? bni_content[key]['file_order'] : [bni_content[key]['file_order']];
                for (const i in files[categoryName]) {
                    if (bni_content[key]['file_order'].includes(+i)) {
                        file[categoryName].push(files[categoryName][i]);
                    }
                }
                console.log(123);
                if (bni['update_idx'] > 0 && file[categoryName].length > 0) {
                    try {
                        const files = await this.fileService.findCategory([categoryName], '' + bni['update_idx']);
                        const delFileIdxs = (0, lodash_1.map)(files, o => '' + o.file_idx);
                        if (delFileIdxs.length > 0) {
                            await this.fileService.removes(delFileIdxs);
                        }
                    }
                    catch (error) {
                        console.log('삭제할 파일정보가 없습니다.');
                    }
                }
                console.log(234);
                if (file[categoryName].length > 0) {
                    await this.fileService.createByRequest(file, bannerItem['idx']);
                }
            }
        }
        if (!(0, lodash_1.isEmpty)(del_bni)) {
            let del_bni_idxs = [];
            for (const key in del_bni) {
                const idxs = (0, lodash_1.map)(del_bni[key], o => o.idx);
                del_bni_idxs = (0, lodash_1.union)(del_bni_idxs, idxs);
            }
            try {
                const del_files = await this.fileService.findCategoryForeignAll([categoryName], del_bni_idxs);
                const del_file_idxs = (0, lodash_1.map)(del_files, o => '' + o.file_idx);
                await this.fileService.removes(del_file_idxs);
            }
            catch (error) {
                console.log({ error });
                console.log('삭제할 파일이 없습니다');
            }
            await this.removeIdxs(del_bni_idxs);
        }
        const banner = await this.bannerService.findOneId(bannerId);
        const fileIdxs = (0, lodash_1.map)(banner['bannerItem'], o => o.idx);
        let file_info = {};
        if (fileIdxs.length > 0) {
            try {
                file_info = await this.fileService.findCategoryForeignAll([categoryName], fileIdxs);
                file_info = common_utils_1.commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
            }
            catch (error) {
                console.log('파일정보가 없습니다.');
            }
        }
        return { banner, file_info };
    }
    findAll() {
        return `This action returns all banner`;
    }
    findOne(id) {
        return `This action returns a #${id} banner`;
    }
    update(id, updateBannerItemDto) {
        return `This action updates a #${id} banner`;
    }
    remove(id) {
        return `This action removes a #${id} banner`;
    }
    async removeIdxs(idxs) {
        await this.bniRepository.createQueryBuilder()
            .delete()
            .where({ idx: (0, typeorm_2.In)(idxs) })
            .execute();
    }
};
BannerItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(banner_item_entity_1.BannerItemEntity)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => banner_service_1.BannerService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        banner_service_1.BannerService,
        file_service_1.FileService])
], BannerItemService);
exports.BannerItemService = BannerItemService;
//# sourceMappingURL=banner-item.service.js.map