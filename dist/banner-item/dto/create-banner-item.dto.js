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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBannerItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateBannerItemDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '배너 아이템 정보 (json형식)<br>'
            + 'status 배너 아이템 상태 ex) {"status":2} (1: 미사용, 2: 사용) 기본값 2<br>'
            + 'start 배너 아이템 시작일 ex) {"start":"2023-01-01 10:00:00"}<br>'
            + 'end 배너 아이템 종료일 ex) {"end":"2023-02-01 23:59:59"}<br>'
            + 'file_order 배너 아이템 첨부파일 배열에 담긴 번호 ex) {"file_order":배열 idx번호}<br>'
            + '첨부파일 없는 경우 file_order값 생략<br>'
            + '첨부파일 이름으로 구분하는 경우 동일한 파일명 존재시 어떤 배너 아이템인지 구분 불가<br>'
            + 'ex) [{"title":"제목","status":2,"link":"외부링크"}]'
    }),
    __metadata("design:type", String)
], CreateBannerItemDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '배너 id' }),
    __metadata("design:type", String)
], CreateBannerItemDto.prototype, "bannerId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ format: 'binary', description: '배너 아이템 이미지', required: false }),
    __metadata("design:type", Array)
], CreateBannerItemDto.prototype, "bniImg", void 0);
exports.CreateBannerItemDto = CreateBannerItemDto;
//# sourceMappingURL=create-banner-item.dto.js.map