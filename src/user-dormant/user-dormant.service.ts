import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isArray } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDormantDto } from './dto/create-user-dormant.dto';
import { UpdateUserDormantDto } from './dto/update-user-dormant.dto';
import { UserDormantEntity } from './entities/user-dormant.entity';
import { usersConstant } from 'src/users/constants';

@Injectable()
export class UserDormantService {
  constructor(
    @InjectRepository(UserDormantEntity) private userDormantRepository: Repository<UserDormantEntity>,
  ) { }

  create(createUserDormantDto: CreateUserDormantDto) {
    return 'This action adds a new userDormant';
  }

  async findAll(options: PaginationOptions, search: string[], order: string) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);

    const alias = 'users_dormant';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(order_by, alias + '.createdAt', 'DESC');

    const [results, total] = await this.userDormantRepository.createQueryBuilder('users_dormant')
      .leftJoin('users', 'users', '`users`.id = `users_dormant`.id')
      .leftJoinAndSelect('users.group', 'group')
      .where(qb => {
        qb.where('`users`.`status` = :status', { status: usersConstant.status.dormant })
        get(where, 'group', '') && qb.andWhere('`users`.groupIdx IN (:group)', { group: isArray(get(where, 'group')) ? get(where, 'group') : [get(where, 'group')] })
        get(where, 'id', '') && qb.andWhere('`users_dormant`.`id` LIKE :id', { id: '%' + where['id'] + '%' })
        get(where, 'name', '') && qb.andWhere('`users`.`name` LIKE :name', { name: '%' + where['name'] + '%' })
        get(where, 'email', '') && qb.andWhere('`users`.`email` LIKE :email', { email: '%' + where['email'] + '%' })
        get(where, 'phone', '') && qb.andWhere('`users`.`phone` LIKE :phone', { phone: '%' + where['phone'] + '%' })
        get(where, 'language', '') && qb.andWhere('`users`.`language` IN (:language)', { language: isArray(where['language']) ? where['language'] : [where['language']] })
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

  async findOneId(id: string) {
    if (!id) {
      throw new NotFoundException('userDormant.service.findOneId: 조회할 정보가 없습니다.');
    }
    const dormantUser = await this.userDormantRepository.findOne({
      where: { id: id },
    });
    if (!get(dormantUser, 'idx', '')) {
      throw new NotFoundException('userDormant.service.findOneId: 존재하지 않는 휴면회원 입니다.');
    }

    return dormantUser;
  }

  update(id: number, updateUserDormantDto: UpdateUserDormantDto) {
    return `This action updates a #${id} userDormant`;
  }

  async remove(idx: number) {
    if (!idx) {
      throw new NotFoundException('userDormant.service.remove: 삭제할 정보가 없습니다.');
    }
    await this.userDormantRepository.createQueryBuilder()
      .delete()
      .where({ idx: idx })
      .execute();
  }

  async dormantUser(user: UsersEntity) {
    const dormant_data = {
      id: user['id'],
      userInfo: JSON.stringify(user)
    };

    const userDormantEntity = await this.userDormantRepository.create(dormant_data);
    const userDormant = await this.userDormantRepository.save(userDormantEntity);

    return userDormant;
  }
}
