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
exports.UpdateMembershipDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_membership_dto_1 = require("./create-membership.dto");
class UpdateMembershipDto extends (0, swagger_1.PartialType)(create_membership_dto_1.CreateMembershipDto) {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '멤버십 신청 상태 변경 (2: 승인, 3: 종료, 기본값: 2)' }),
    __metadata("design:type", Number)
], UpdateMembershipDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '멤버십 신청 기간 변경 (1: 1개월, 3: 3개월 ...)<br>값 없는 경우 이전에 저장된 값으로 설정' }),
    __metadata("design:type", Number)
], UpdateMembershipDto.prototype, "month", void 0);
exports.UpdateMembershipDto = UpdateMembershipDto;
//# sourceMappingURL=update-membership.dto.js.map