"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMypageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_mypage_dto_1 = require("./create-mypage.dto");
class UpdateMypageDto extends (0, swagger_1.PartialType)(create_mypage_dto_1.CreateMypageDto) {
}
exports.UpdateMypageDto = UpdateMypageDto;
//# sourceMappingURL=update-mypage.dto.js.map