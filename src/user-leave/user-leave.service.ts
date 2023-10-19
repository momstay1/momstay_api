import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isArray } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserLeaveDto } from './dto/create-user-leave.dto';
import { UpdateUserLeaveDto } from './dto/update-user-leave.dto';
import { UserLeaveEntity } from './entities/user-leave.entity';
import { usersConstant } from 'src/users/constants';

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
      user_idx: user['idx'],
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
      .leftJoin('users', 'users', '`users`.idx = `users_leave`.idx')
      .leftJoinAndSelect('users.group', 'group')
      .where(qb => {
        qb.where('`users`.`status` = :status', { status: usersConstant.status.leave })
        get(where, 'group', '') && qb.andWhere('`users`.groupIdx IN (:group)', { group: isArray(get(where, 'group')) ? get(where, 'group') : [get(where, 'group')] })
        get(where, 'id', '') && qb.andWhere('`users_leave`.`id` LIKE :id', { id: '%' + where['id'] + '%' })
        get(where, 'name', '') && qb.andWhere('`users_leave`.`userInfo` LIKE :name', { name: '%' + where['name'] + '%' })
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
