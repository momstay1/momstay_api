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
exports.BoardSelectedCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const board_categories_service_1 = require("../board-categories/board-categories.service");
const typeorm_2 = require("typeorm");
const board_selected_categories_entity_1 = require("./entities/board-selected-categories.entity");
let BoardSelectedCategoriesService = class BoardSelectedCategoriesService {
    constructor(bscatsRepository, bcatsService) {
        this.bscatsRepository = bscatsRepository;
        this.bcatsService = bcatsService;
    }
    async create(createbscatContentDto) {
        const bscat = await this.bscatsRepository.save(createbscatContentDto);
        bscat.bcats = await this.bcatsService.findOne(bscat.bscat_bcat_idx);
        delete bscat.bc;
        return bscat;
    }
    async saveToBscat(bcat, boardContent) {
        const bscatsEntity = new board_selected_categories_entity_1.BoardSelectedCategoriesEntity();
        bscatsEntity.bscat_bcat_idx = bcat.bcat_idx;
        bscatsEntity.bscat_bc_idx = boardContent.bc_idx;
        bscatsEntity.bcats = bcat;
        bscatsEntity.bc = boardContent;
        return await this.create(bscatsEntity);
    }
    async removes(idxs) {
        await this.bscatsRepository.createQueryBuilder()
            .delete()
            .where(" bscat_idx IN (:idxs)", { idxs: idxs })
            .execute();
    }
};
BoardSelectedCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_selected_categories_entity_1.BoardSelectedCategoriesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        board_categories_service_1.BoardCategoriesService])
], BoardSelectedCategoriesService);
exports.BoardSelectedCategoriesService = BoardSelectedCategoriesService;
//# sourceMappingURL=board-selected-categories.service.js.map