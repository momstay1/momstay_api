"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MypageService = void 0;
const common_1 = require("@nestjs/common");
let MypageService = class MypageService {
    create(createMypageDto) {
        return 'This action adds a new mypage';
    }
    findAll() {
        return `This action returns all mypage`;
    }
    findOne(id) {
        return `This action returns a #${id} mypage`;
    }
    update(id, updateMypageDto) {
        return `This action updates a #${id} mypage`;
    }
    remove(id) {
        return `This action removes a #${id} mypage`;
    }
};
MypageService = __decorate([
    (0, common_1.Injectable)()
], MypageService);
exports.MypageService = MypageService;
//# sourceMappingURL=mypage.service.js.map