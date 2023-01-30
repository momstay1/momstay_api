"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRefreshTokenDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_refresh_token_dto_1 = require("./create-refresh-token.dto");
class UpdateRefreshTokenDto extends (0, swagger_1.PartialType)(create_refresh_token_dto_1.CreateRefreshTokenDto) {
}
exports.UpdateRefreshTokenDto = UpdateRefreshTokenDto;
//# sourceMappingURL=update-refresh-token.dto.js.map