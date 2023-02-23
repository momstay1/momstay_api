"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgDataService = void 0;
const common_1 = require("@nestjs/common");
let PgDataService = class PgDataService {
    create(createPgDatumDto) {
        return 'This action adds a new pgDatum';
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
    (0, common_1.Injectable)()
], PgDataService);
exports.PgDataService = PgDataService;
//# sourceMappingURL=pg-data.service.js.map