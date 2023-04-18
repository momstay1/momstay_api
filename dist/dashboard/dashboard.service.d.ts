import { AdminUsersService } from 'src/admin-users/admin-users.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { ReservationService } from 'src/reservation/reservation.service';
import { UsersService } from 'src/users/users.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { OrderTotalService } from 'src/order-total/order-total.service';
export declare class DashboardService {
    private readonly adminService;
    private readonly usersService;
    private readonly productService;
    private readonly orderService;
    private readonly orderTotalService;
    private readonly reservationService;
    constructor(adminService: AdminUsersService, usersService: UsersService, productService: ProductService, orderService: OrderService, orderTotalService: OrderTotalService, reservationService: ReservationService);
    create(createDashboardDto: CreateDashboardDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDashboardDto: UpdateDashboardDto): string;
    remove(id: number): string;
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
