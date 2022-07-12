"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDefectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_defect_dto_1 = require("./create-defect.dto");
class UpdateDefectDto extends (0, swagger_1.PartialType)(create_defect_dto_1.CreateDefectDto) {
}
exports.UpdateDefectDto = UpdateDefectDto;
//# sourceMappingURL=update-defect.dto.js.map