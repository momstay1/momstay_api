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
exports.UserDormantController = void 0;
const common_1 = require("@nestjs/common");
const user_dormant_service_1 = require("./user-dormant.service");
const create_user_dormant_dto_1 = require("./dto/create-user-dormant.dto");
const update_user_dormant_dto_1 = require("./dto/update-user-dormant.dto");
let UserDormantController = class UserDormantController {
    constructor(userDormantService) {
        this.userDormantService = userDormantService;
    }
    create(createUserDormantDto) {
        return this.userDormantService.create(createUserDormantDto);
    }
    findAll() {
        return this.userDormantService.findAll();
    }
    findOne(id) {
        return this.userDormantService.findOne(+id);
    }
    update(id, updateUserDormantDto) {
        return this.userDormantService.update(+id, updateUserDormantDto);
    }
    remove(id) {
        return this.userDormantService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dormant_dto_1.CreateUserDormantDto]),
    __metadata("design:returntype", void 0)
], UserDormantController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserDormantController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserDormantController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dormant_dto_1.UpdateUserDormantDto]),
    __metadata("design:returntype", void 0)
], UserDormantController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserDormantController.prototype, "remove", null);
UserDormantController = __decorate([
    (0, common_1.Controller)('user-dormant'),
    __metadata("design:paramtypes", [user_dormant_service_1.UserDormantService])
], UserDormantController);
exports.UserDormantController = UserDormantController;
//# sourceMappingURL=user-dormant.controller.js.map