import { Injectable } from '@nestjs/common';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
import { UsersService } from 'src/users/users.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(
    private readonly adminService: AdminUsersService,
    private readonly usersService: UsersService,
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

  async usersCount(user) {
    // const admin_cnt = await this.adminService.count(user);
    const users_cnt = await this.usersService.count();

    return {
      total_cnt: users_cnt,
      // admin_cnt,
      users_cnt,
    };
  }
}
