import { PaginationResult } from './pagination.results';
export declare class Pagination<PaginationEntity> {
    results: PaginationEntity[];
    pageTotal: number;
    total: number;
    constructor(paginationResult: PaginationResult<PaginationEntity>);
}
