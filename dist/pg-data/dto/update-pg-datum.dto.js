"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePgDatumDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_pg_datum_dto_1 = require("./create-pg-datum.dto");
class UpdatePgDatumDto extends (0, swagger_1.PartialType)(create_pg_datum_dto_1.CreatePgDatumDto) {
}
exports.UpdatePgDatumDto = UpdatePgDatumDto;
//# sourceMappingURL=update-pg-datum.dto.js.map