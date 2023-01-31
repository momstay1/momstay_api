"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWishlistDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_wishlist_dto_1 = require("./create-wishlist.dto");
class UpdateWishlistDto extends (0, swagger_1.PartialType)(create_wishlist_dto_1.CreateWishlistDto) {
}
exports.UpdateWishlistDto = UpdateWishlistDto;
//# sourceMappingURL=update-wishlist.dto.js.map