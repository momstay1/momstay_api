"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductOptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_product_option_dto_1 = require("./create-product-option.dto");
class UpdateProductOptionDto extends (0, swagger_1.PartialType)(create_product_option_dto_1.CreateProductOptionDto) {
}
exports.UpdateProductOptionDto = UpdateProductOptionDto;
//# sourceMappingURL=update-product-option.dto.js.map