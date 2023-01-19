"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_product_info_dto_1 = require("./create-product-info.dto");
class UpdateProductInfoDto extends (0, swagger_1.PartialType)(create_product_info_dto_1.CreateProductInfoDto) {
}
exports.UpdateProductInfoDto = UpdateProductInfoDto;
//# sourceMappingURL=update-product-info.dto.js.map