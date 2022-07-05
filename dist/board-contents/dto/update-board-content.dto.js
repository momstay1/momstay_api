"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBoardContentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_board_content_dto_1 = require("./create-board-content.dto");
class UpdateBoardContentDto extends (0, swagger_1.PartialType)(create_board_content_dto_1.CreateBoardContentDto) {
}
exports.UpdateBoardContentDto = UpdateBoardContentDto;
//# sourceMappingURL=update-board-content.dto.js.map