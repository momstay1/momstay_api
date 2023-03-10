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
exports.PgDataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pg_data_entity_1 = require("./entities/pg-data.entity");
let PgDataService = class PgDataService {
    constructor(pgDataRepository) {
        this.pgDataRepository = pgDataRepository;
    }
    async create(ord_code, createPgData) {
        createPgData['pg_data'] = JSON.stringify(createPgData);
        createPgData['productCode'] = ord_code;
        const pg_data = await this.pgDataRepository.create(createPgData);
        const pg = await this.pgDataRepository.save(pg_data);
        return pg;
    }
    findAll() {
        return `This action returns all pgData`;
    }
    findOne(id) {
        return `This action returns a #${id} pgDatum`;
    }
    update(id, updatePgDatumDto) {
        return `This action updates a #${id} pgDatum`;
    }
    remove(id) {
        return `This action removes a #${id} pgDatum`;
    }
};
PgDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pg_data_entity_1.PgDataEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PgDataService);
exports.PgDataService = PgDataService;
//# sourceMappingURL=pg-data.service.js.map