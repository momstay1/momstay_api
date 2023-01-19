"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_login_dto_1 = require("./create-login.dto");
class UpdateLoginDto extends (0, swagger_1.PartialType)(create_login_dto_1.CreateLoginDto) {
}
exports.UpdateLoginDto = UpdateLoginDto;
//# sourceMappingURL=update-login.dto.js.map