import { OrderTotalService } from './order-total.service';
export declare class AdminOrderTotalController {
    private readonly orderTotalService;
    constructor(orderTotalService: OrderTotalService);
    salesStatisticsYear(): Promise<{
        sales_statistics: {
            year: any[];
            month: any[];
            day: any[];
        };
    }>;
    salesStatisticsMonth(year: string): Promise<{
        sales_statistics: {
            year: any[];
            month: any[];
            day: any[];
        };
    }>;
    salesStatisticsDay(yearMonth: string): Promise<{
        sales_statistics: {
            year: any[];
            month: any[];
            day: any[];
        };
    }>;
}
