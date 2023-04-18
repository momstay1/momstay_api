import { DashboardService } from './dashboard.service';
export declare class AdminDashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getUsersDashboard(): Promise<{
        users_cnt: any;
    }>;
    getProductDashboard(): Promise<{
        product_cnt: any;
    }>;
    getOrderDashboard(): Promise<{
        order_cnt: any;
        order_total_price: any;
        reservation_cnt: any;
    }>;
}
