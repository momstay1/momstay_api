import { Injectable } from '@nestjs/common';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { ReservationService } from 'src/reservation/reservation.service';
import { UsersService } from 'src/users/users.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

import * as moment from 'moment';
import { OrderTotalService } from 'src/order-total/order-total.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly adminService: AdminUsersService,
    private readonly usersService: UsersService,
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
    private readonly orderTotalService: OrderTotalService,
    private readonly reservationService: ReservationService,
  ) { }

  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  findAll() {
    return `This action returns all dashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }

  async getUsersDashboard() {
    const users_cnt = await this.usersService.dashboard();

    return { users_cnt };
  }

  async getProductDashboard() {
    const product_cnt = await this.productService.dashboard();

    return { product_cnt };
  }

  async getOrderDashboard() {
    const month = moment().format('YYYY-MM');
    const order_cnt = await this.orderService.dashboard(month);
    const order_total_price = await this.orderTotalService.dashboard(month);
    const reservation_cnt = await this.reservationService.dashboard(month);

    return { order_cnt, order_total_price, reservation_cnt };
  }
}
