import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserLeaveDto } from './dto/create-user-leave.dto';
import { UpdateUserLeaveDto } from './dto/update-user-leave.dto';
import { UserLeaveEntity } from './entities/user-leave.entity';

@Injectable()
export class UserLeaveService {
  constructor(
    @InjectRepository(UserLeaveEntity) private userLeaveRepository: Repository<UserLeaveEntity>,
  ) { }

  create(createUserLeaveDto: CreateUserLeaveDto) {
    return 'This action adds a new userLeave';
  }

  async leaveUser(user: UsersEntity, reason: string) {
    const leave_data = {
      id: user['id'],
      reason: reason,
      userInfo: JSON.stringify(user)
    };

    const userLeaveEntity = await this.userLeaveRepository.create(leave_data);
    const userLeave = await this.userLeaveRepository.save(userLeaveEntity);

    return userLeave;
  }

  async findAll(options: PaginationOptions, search: string[], order: string) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);

    const alias = 'users_leave';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(order_by, alias + '.createdAt', 'DESC');

    const [results, total] = await this.userLeaveRepository.createQueryBuilder('users_leave')
      .where(qb => {
        get(where, 'id', '') && qb.where('`users_leave`.`id` = :id', { id: where['id'] })
      })
      .orderBy(order_by)
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    for (const key in results) {
      results[key].userInfo = JSON.parse(results[key].userInfo);
    }

    const data = new Pagination({
      results,
      total,
      page,
    });

    return { data };
  }

  findOne(id: number) {
    return `This action returns a #${id} userLeave`;
  }

  update(id: number, updateUserLeaveDto: UpdateUserLeaveDto) {
    return `This action updates a #${id} userLeave`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLeave`;
  }
}
