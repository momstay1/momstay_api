"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockModule = void 0;
const common_1 = require("@nestjs/common");
const block_service_1 = require("./block.service");
const block_controller_1 = require("./block.controller");
const typeorm_1 = require("@nestjs/typeorm");
const block_entity_1 = require("./entities/block.entity");
const users_module_1 = require("../users/users.module");
let BlockModule = class BlockModule {
};
BlockModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([block_entity_1.BlockEntity]),
            users_module_1.UsersModule
        ],
        controllers: [block_controller_1.BlockController],
        providers: [block_service_1.BlockService],
        exports: [block_service_1.BlockService]
    })
], BlockModule);
exports.BlockModule = BlockModule;
//# sourceMappingURL=block.module.js.map