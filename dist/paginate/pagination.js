"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
class Pagination {
    constructor(paginationResult) {
        this.results = paginationResult.results;
        this.pageTotal = paginationResult.results.length;
        this.total = paginationResult.total;
    }
}
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.js.map