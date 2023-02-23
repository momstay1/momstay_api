"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_order_product_dto_1 = require("./create-order-product.dto");
class UpdateOrderProductDto extends (0, swagger_1.PartialType)(create_order_product_dto_1.CreateOrderProductDto) {
}
exports.UpdateOrderProductDto = UpdateOrderProductDto;
//# sourceMappingURL=update-order-product.dto.js.map