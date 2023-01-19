"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserLeaveDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_leave_dto_1 = require("./create-user-leave.dto");
class UpdateUserLeaveDto extends (0, swagger_1.PartialType)(create_user_leave_dto_1.CreateUserLeaveDto) {
}
exports.UpdateUserLeaveDto = UpdateUserLeaveDto;
//# sourceMappingURL=update-user-leave.dto.js.map