"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlaceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_place_dto_1 = require("./create-place.dto");
class UpdatePlaceDto extends (0, swagger_1.PartialType)(create_place_dto_1.CreatePlaceDto) {
}
exports.UpdatePlaceDto = UpdatePlaceDto;
//# sourceMappingURL=update-place.dto.js.map