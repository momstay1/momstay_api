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
exports.BoardCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const board_categories_entity_1 = require("./entities/board-categories.entity");
let BoardCategoriesService = class BoardCategoriesService {
    constructor(bcatRepository) {
        this.bcatRepository = bcatRepository;
    }
    async findOne(idx) {
        const bcat = await this.bcatRepository.findOne({ bcat_idx: idx });
        if (!bcat) {
            throw new common_1.NotFoundException('존재하지 않는 카테고리 입니다.');
        }
        return bcat;
    }
    async searching(sqlQuery) {
        const bcat = await this.bcatRepository.find(sqlQuery);
        if (!bcat) {
            throw new common_1.NotFoundException('존재하지 않는 카테고리 입니다.');
        }
        return bcat;
    }
    async findAll() {
        return await this.bcatRepository.find({
            where: { bcat_status: 1 }
        });
    }
};
BoardCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_categories_entity_1.BoardCategoriesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BoardCategoriesService);
exports.BoardCategoriesService = BoardCategoriesService;
//# sourceMappingURL=board-categories.service.js.map