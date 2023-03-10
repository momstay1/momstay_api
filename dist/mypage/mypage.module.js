"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MypageModule = void 0;
const common_1 = require("@nestjs/common");
const mypage_service_1 = require("./mypage.service");
const mypage_controller_1 = require("./mypage.controller");
const board_contents_module_1 = require("../board-contents/board-contents.module");
const reviews_module_1 = require("../reviews/reviews.module");
let MypageModule = class MypageModule {
};
MypageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            board_contents_module_1.BoardContentsModule,
            reviews_module_1.ReviewsModule,
        ],
        controllers: [mypage_controller_1.MypageController],
        providers: [mypage_service_1.MypageService]
    })
], MypageModule);
exports.MypageModule = MypageModule;
//# sourceMappingURL=mypage.module.js.map