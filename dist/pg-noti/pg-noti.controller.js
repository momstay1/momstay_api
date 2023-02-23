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
exports.PgNotiController = void 0;
const common_1 = require("@nestjs/common");
const pg_noti_service_1 = require("./pg-noti.service");
const create_pg_noti_dto_1 = require("./dto/create-pg-noti.dto");
const update_pg_noti_dto_1 = require("./dto/update-pg-noti.dto");
let PgNotiController = class PgNotiController {
    constructor(pgNotiService) {
        this.pgNotiService = pgNotiService;
    }
    create(createPgNotiDto) {
        return this.pgNotiService.create(createPgNotiDto);
    }
    findAll() {
        return this.pgNotiService.findAll();
    }
    findOne(id) {
        return this.pgNotiService.findOne(+id);
    }
    update(id, updatePgNotiDto) {
        return this.pgNotiService.update(+id, updatePgNotiDto);
    }
    remove(id) {
        return this.pgNotiService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pg_noti_dto_1.CreatePgNotiDto]),
    __metadata("design:returntype", void 0)
], PgNotiController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PgNotiController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PgNotiController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pg_noti_dto_1.UpdatePgNotiDto]),
    __metadata("design:returntype", void 0)
], PgNotiController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PgNotiController.prototype, "remove", null);
PgNotiController = __decorate([
    (0, common_1.Controller)('pg-noti'),
    __metadata("design:paramtypes", [pg_noti_service_1.PgNotiService])
], PgNotiController);
exports.PgNotiController = PgNotiController;
//# sourceMappingURL=pg-noti.controller.js.map