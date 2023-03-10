export interface PaginationResult<PaginationEntity> {
    results: PaginationEntity[];
    total: number;
    page?: number;
    next?: string;
    previous?: string;
}
