"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefectPlaceModule = void 0;
const common_1 = require("@nestjs/common");
const defect_place_service_1 = require("./defect-place.service");
const defect_place_controller_1 = require("./defect-place.controller");
const typeorm_1 = require("@nestjs/typeorm");
const defect_place_entity_1 = require("./entities/defect-place.entity");
const place_module_1 = require("../place/place.module");
let DefectPlaceModule = class DefectPlaceModule {
};
DefectPlaceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([defect_place_entity_1.DefectPlaceEntity]),
            place_module_1.PlaceModule
        ],
        controllers: [defect_place_controller_1.DefectPlaceController],
        providers: [defect_place_service_1.DefectPlaceService]
    })
], DefectPlaceModule);
exports.DefectPlaceModule = DefectPlaceModule;
//# sourceMappingURL=defect-place.module.js.map