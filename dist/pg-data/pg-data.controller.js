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
exports.PgDataController = void 0;
const common_1 = require("@nestjs/common");
const pg_data_service_1 = require("./pg-data.service");
const create_pg_datum_dto_1 = require("./dto/create-pg-datum.dto");
const update_pg_datum_dto_1 = require("./dto/update-pg-datum.dto");
let PgDataController = class PgDataController {
    constructor(pgDataService) {
        this.pgDataService = pgDataService;
    }
    create(createPgDatumDto) {
        return this.pgDataService.create(createPgDatumDto);
    }
    findAll() {
        return this.pgDataService.findAll();
    }
    findOne(id) {
        return this.pgDataService.findOne(+id);
    }
    update(id, updatePgDatumDto) {
        return this.pgDataService.update(+id, updatePgDatumDto);
    }
    remove(id) {
        return this.pgDataService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pg_datum_dto_1.CreatePgDatumDto]),
    __metadata("design:returntype", void 0)
], PgDataController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PgDataController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PgDataController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pg_datum_dto_1.UpdatePgDatumDto]),
    __metadata("design:returntype", void 0)
], PgDataController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PgDataController.prototype, "remove", null);
PgDataController = __decorate([
    (0, common_1.Controller)('pg-data'),
    __metadata("design:paramtypes", [pg_data_service_1.PgDataService])
], PgDataController);
exports.PgDataController = PgDataController;
//# sourceMappingURL=pg-data.controller.js.map