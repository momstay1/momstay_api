"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMetroDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_metro_dto_1 = require("./create-metro.dto");
class UpdateMetroDto extends (0, swagger_1.PartialType)(create_metro_dto_1.CreateMetroDto) {
}
exports.UpdateMetroDto = UpdateMetroDto;
//# sourceMappingURL=update-metro.dto.js.map