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
exports.PopupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const file_service_1 = require("../file/file.service");
const paginate_1 = require("../paginate");
const typeorm_2 = require("typeorm");
const popup_entity_1 = require("./entities/popup.entity");
const moment = require("moment");
const uncertifiedStatus = 1;
let PopupService = class PopupService {
    constructor(popupRepository, fileService) {
        this.popupRepository = popupRepository;
        this.fileService = fileService;
    }
    async create(createPopupDto, files) {
        const popupChk = await this.checkPopupIdExists(createPopupDto.id);
        if (popupChk) {
            throw new common_1.UnprocessableEntityException('popup.service.create: 아이디가 중복 됩니다.');
        }
        const popup_data = {
            status: (0, lodash_1.get)(createPopupDto, 'status'),
            id: (0, lodash_1.get)(createPopupDto, 'id'),
            title: (0, lodash_1.get)(createPopupDto, 'title'),
            page: (0, lodash_1.get)(createPopupDto, 'page'),
            startPeriod: (0, lodash_1.get)(createPopupDto, 'startPeriod', null),
            endPeriod: (0, lodash_1.get)(createPopupDto, 'endPeriod', null),
            order: (0, lodash_1.get)(createPopupDto, 'order', 10),
            link: (0, lodash_1.get)(createPopupDto, 'link'),
        };
        popup_data['id'] = await this.popupCreateCode();
        const popupEntity = await this.popupRepository.create(popup_data);
        const popup = await this.popupRepository.save(popupEntity);
        const [fileIdxs] = await this.fileService.createByRequest(files, popup.idx);
        let file_info;
        if ((0, lodash_1.get)(fileIdxs, ['length'], 0) > 0) {
            file_info = await this.fileService.findIndexs(fileIdxs);
        }
        return { popup, file_info };
    }
    async findAll(options) {
        const { take, page } = options;
        const [results, total] = await this.popupRepository
            .createQueryBuilder('popup')
            .orderBy('createdAt', 'DESC')
            .skip(take * (page - 1) || 0)
            .take(take || 10)
            .getManyAndCount();
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data };
    }
    async findOne(idx) {
        const popup = await this.findOneIdx(idx);
        let file_info = {};
        try {
            file_info = await this.fileService.findCategoryForeignAll(['popupImg'], [popup.idx]);
            file_info = common_utils_1.commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
        }
        catch (error) {
            console.log('팝업 상세 이미지 파일 없음');
        }
        return { popup, file_info };
    }
    async getPopup(id, page) {
        const popup = await this.findByIdOrPage(id, page);
        const popup_idxs = popup.map((e) => e.idx);
        let file_info = {};
        try {
            file_info = await this.fileService.findCategoryForeignAll(['popupImg'], popup_idxs);
            file_info = common_utils_1.commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
        }
        catch (error) {
            console.log('팝업 상세 이미지 파일 없음');
        }
        return { popup, file_info };
    }
    async findOneIdx(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('popup.service.findOneIdx: 잘못된 정보 입니다.');
        }
        const popup = await this.popupRepository.findOne({
            where: { idx },
        });
        if (!(0, lodash_1.get)(popup, 'idx')) {
            throw new common_1.NotFoundException('popup.service.findOneIdx: 정보를 찾을 수 없습니다.');
        }
        return popup;
    }
    async findByIdOrPage(id, page) {
        if (!id && !page) {
            throw new common_1.NotFoundException('popup.service.findByIdOrPage: 잘못된 정보 입니다.');
        }
        const where = {
            status: 2,
        };
        if (id) {
            where['id'] = id;
        }
        if (page) {
            where['page'] = page;
        }
        const popup = await this.popupRepository.find({
            where: where,
        });
        if (popup.length === 0) {
            throw new common_1.NotFoundException('popup.service.findByIdOrPage: 정보를 찾을 수 없습니다.');
        }
        return popup;
    }
    async update(idx, updatePopupDto, files) {
        const prevPopup = await this.findOneIdx(idx);
        const popupEntity = Object.assign(Object.assign({}, prevPopup), updatePopupDto);
        const popup = await this.popupRepository.save(popupEntity);
        await this.fileService.removeByRequest(updatePopupDto, popup['idx'], [
            'popupImg',
        ]);
        await this.fileService.createByRequest(files, popup['idx']);
        let file_info;
        try {
            file_info = await this.fileService.findCategory(['popupImg'], '' + popup['idx']);
        }
        catch (error) {
            console.log(error['response']['message']);
        }
        return { popup, file_info };
    }
    async delete(idxs) {
        if (idxs.length <= 0) {
            throw new common_1.NotFoundException('popup.service.delete: 삭제할 정보가 없습니다.');
        }
        await this.popupRepository
            .createQueryBuilder()
            .delete()
            .where('idx IN (:idxs)', { idxs: idxs })
            .execute();
    }
    async popupCreateCode() {
        const code = moment().format('YYMMDD') + common_utils_1.commonUtils.createCode().toUpperCase();
        const isCode = await this.checkPopupIdExists(code);
        return isCode ? this.popupCreateCode() : code;
    }
    async checkPopupIdExists(id) {
        return await this.popupRepository.findOne({ id: id });
    }
};
PopupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(popup_entity_1.PopupEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        file_service_1.FileService])
], PopupService);
exports.PopupService = PopupService;
//# sourceMappingURL=popup.service.js.map