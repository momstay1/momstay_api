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
exports.CollegeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const college_service_1 = require("./college.service");
const create_college_dto_1 = require("./dto/create-college.dto");
const update_college_dto_1 = require("./dto/update-college.dto");
let CollegeController = class CollegeController {
    constructor(collegeService) {
        this.collegeService = collegeService;
    }
    create(createCollegeDto) {
        return this.collegeService.create(createCollegeDto);
    }
    async findAll(take, page, search) {
        const { results, total, pageTotal } = await this.collegeService.findAll({ take, page }, search);
        return {
            results,
            total,
            pageTotal
        };
    }
    findOne(id) {
        return this.collegeService.findOne(+id);
    }
    update(id, updateCollegeDto) {
        return this.collegeService.update(+id, updateCollegeDto);
    }
    remove(id) {
        return this.collegeService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_college_dto_1.CreateCollegeDto]),
    __metadata("design:returntype", void 0)
], CollegeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '대학교 리스트 API' }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        description: 'search=name:대학이름<br>',
        required: false
    }),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array]),
    __metadata("design:returntype", Promise)
], CollegeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollegeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_college_dto_1.UpdateCollegeDto]),
    __metadata("design:returntype", void 0)
], CollegeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollegeController.prototype, "remove", null);
CollegeController = __decorate([
    (0, common_1.Controller)('college'),
    (0, swagger_1.ApiTags)('대학교 API'),
    __metadata("design:paramtypes", [college_service_1.CollegeService])
], CollegeController);
exports.CollegeController = CollegeController;
//# sourceMappingURL=college.controller.js.map