"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefectModule = void 0;
const common_1 = require("@nestjs/common");
const defect_service_1 = require("./defect.service");
const defect_controller_1 = require("./defect.controller");
const common_service_1 = require("../common/common.service");
const defect_entity_1 = require("./entities/defect.entity");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const file_module_1 = require("../file/file.module");
const place_module_1 = require("../place/place.module");
let DefectModule = class DefectModule {
};
DefectModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([defect_entity_1.DefectEntity]),
            users_module_1.UsersModule,
            file_module_1.FileModule,
            (0, common_1.forwardRef)(() => place_module_1.PlaceModule),
        ],
        controllers: [defect_controller_1.DefectController],
        providers: [defect_service_1.DefectService, common_service_1.CommonService],
        exports: [defect_service_1.DefectService],
    })
], DefectModule);
exports.DefectModule = DefectModule;
//# sourceMappingURL=defect.module.js.map