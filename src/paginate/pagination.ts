import { PaginationResult } from './pagination.results';

export class Pagination<PaginationEntity> {
  public results: PaginationEntity[];
  public pageTotal: number;
  public total: number;
  public page: number;

  constructor(paginationResult: PaginationResult<PaginationEntity>) {
    this.results = paginationResult.results;
    this.pageTotal = paginationResult.results.length;
    this.total = paginationResult.total;
    this.page = paginationResult.page;
  }
}