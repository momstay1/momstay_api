"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupModule = void 0;
const common_1 = require("@nestjs/common");
const popup_service_1 = require("./popup.service");
const popup_controller_1 = require("./popup.controller");
const typeorm_1 = require("@nestjs/typeorm");
const popup_entity_1 = require("./entities/popup.entity");
const file_module_1 = require("../file/file.module");
const admin_popup_controller_1 = require("./admin-popup.controller");
let PopupModule = class PopupModule {
};
PopupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([popup_entity_1.PopupEntity]),
            file_module_1.FileModule
        ],
        controllers: [popup_controller_1.PopupController, admin_popup_controller_1.AdminPopupController],
        providers: [popup_service_1.PopupService],
    })
], PopupModule);
exports.PopupModule = PopupModule;
//# sourceMappingURL=popup.module.js.map