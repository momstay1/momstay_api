import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filter, get, isArray, isEmpty, map } from 'lodash';
import moment from 'moment';
import { commonBcrypt } from 'src/common/common.bcrypt';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { GroupsService } from 'src/groups/groups.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UserSnsService } from 'src/user-sns/user-sns.service';
import { Brackets, In, MoreThanOrEqual, Repository } from 'typeorm';
import { usersConstant } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>,
    private readonly groupService: GroupsService,
    private readonly userSnsService: UserSnsService,
    private readonly fileService: FileService,
  ) { }

  async create(createUserDto: CreateUserDto, files) {
    //회원 아이디 중복 체크
    const userChk = await this.checkUserExists(createUserDto.id);
    if (userChk) {
      throw new UnprocessableEntityException('아이디가 중복 됩니다.');
    }

    //회원 정보 저장
    const save_user = await this.saveUser(createUserDto);

    await this.userSnsService.saveUserSns(createUserDto.snsInfo, save_user);

    const user = await this.findIdx(save_user['idx']);
    const file_info = await this.fileService.fileInfoInsert(files, save_user['idx']);
    return { user, file_info };
  }

  async findAll(user, options: PaginationOptions, search: string[]) {
    const { take, page } = options;

    const status_arr: number[] = [];
    for (const key in usersConstant.status) {
      if (key != 'delete') {
        status_arr.push(usersConstant.status[key]);
      }
    }
    const where = commonUtils.searchSplit(search);

    const group = await this.groupService.findOneName(user.group);
    const data = await this.usersRepository.createQueryBuilder('users')
      .addSelect('`groups`.idx AS groups_idx')
      .leftJoin('users.groups', 'groups')
      .leftJoin('users.userSns', 'userSns')
      .where(new Brackets(qb => {
        qb.where('users.status IN (:user_status)', { user_status: status_arr });
        get(where, 'group', '') && qb.andWhere('`groups`.idx IN (:group)', { group: get(where, 'group') })
        get(where, 'id', '') && qb.andWhere('`users`.id LIKE :id', { id: '%' + get(where, 'id') + '%' })
        get(where, 'name', '') && qb.andWhere('`users`.name LIKE :name', { name: '%' + get(where, 'name') + '%' })
        get(where, 'email', '') && qb.andWhere('`users`.email LIKE :email', { email: '%' + get(where, 'email') + '%' })
        get(where, 'phone', '') && qb.andWhere('`users`.phone LIKE :phone', { phone: '%' + get(where, 'phone') + '%' })
        get(where, 'birthday', '') && qb.andWhere('`users`.birthday LIKE :birthday', { birthday: '%' + get(where, 'birthday') + '%' })
        get(where, 'createdAt_mte', '') && qb.andWhere('`users`.`createdAt` >= :createdAt_mte', { createdAt_mte: get(where, 'createdAt_mte') + ' 00:00:00' });
        get(where, 'createdAt_lte', '') && qb.andWhere('`users`.`createdAt` <= :createdAt_lte', { createdAt_lte: get(where, 'createdAt_lte') + ' 23:59:59' });
      }))
      .groupBy('users_idx')
      .having('MIN(`groups`.`idx`) >= :group_idx', { group_idx: group.idx })
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getMany();
    const user_idxs = map(data, (o) => o.idx);

    const [results, total] = await this.usersRepository.findAndCount({
      where: { idx: In(user_idxs) },
      relations: ['groups', 'userSns'],
    });

    return new Pagination({
      results,
      total,
    })
  }

  async count() {
    return await this.usersRepository.count({ where: { user_status: usersConstant.status.registration } });
  }

  async findOne(obj: object): Promise<UsersEntity | undefined> {
    if (isEmpty(obj)) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const user = await this.usersRepository.findOne({
      where: obj,
      relations: ['groups', 'userSns', 'login'],
    });
    if (!user) {
      throw new NotFoundException('존재하지 않는 회원 입니다.');
    }
    return user;
  }

  async findId(id: string): Promise<UsersEntity | undefined> {
    if (!id) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: ['groups', 'userSns', 'login'],
    });
    if (!user) {
      throw new NotFoundException('존재하지 않는 회원 입니다.');
    }

    return user;
  }

  async loginChk(id: string): Promise<UsersEntity | undefined> {
    if (!id) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const user = await this.usersRepository.findOne({
      where: (qb) => {
        qb.where('`email` = :email', { email: id })
        qb.orWhere('`UsersEntity`.`id` = :id', { id: id })
      },
      relations: ['groups', 'userSns', 'login'],
    });
    if (!user) {
      throw new NotFoundException('존재하지 않는 회원 입니다.');
    }

    return user;
  }

  async findIdx(idx: number): Promise<UsersEntity | undefined> {
    if (!idx) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const user = await this.usersRepository.findOne({
      where: { idx: idx },
      relations: ['groups', 'userSns'],
    });
    if (!user) {
      throw new NotFoundException('존재하지 않는 회원 입니다.');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, files) {
    const user = await this.findId(id);

    const groupIdxs = updateUserDto.group ? updateUserDto.group : [usersConstant.default.group_idx];
    const groups = await this.groupService.findIdxs(groupIdxs);

    user.name = updateUserDto.name;
    user.status = +get(updateUserDto, 'status', usersConstant.status.registration);
    user.name = get(updateUserDto, 'name', '');
    user.email = get(updateUserDto, 'email', '');
    user.phone = get(updateUserDto, 'phone', '');
    user.birthday = get(updateUserDto, 'birthday', '0000-00-00');
    user.memo = get(updateUserDto, 'memo', '');
    user.groups = groups;
    if (get(updateUserDto, 'password')) {
      user.password = await commonBcrypt.setBcryptPassword(get(updateUserDto, 'password'));
    }
    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findId(id);
    user.status = usersConstant.status.delete;
    await this.usersRepository.save(user);
  }

  async removes(ids) {
    if (ids.length <= 0) {
      throw new NotFoundException('삭제할 정보가 없습니다.');
    }
    await this.usersRepository.createQueryBuilder()
      .update(UsersEntity)
      .set({ status: Number(usersConstant.status.delete) })
      .where(" id IN (:ids)", { ids: ids })
      .execute()
  }

  getPrivateColumn(): string[] {
    return usersConstant.privateColumn;
  }

  //회원 정보 저장
  private async saveUser(createUserDto): Promise<any> {
    const addPrefixUserDto = createUserDto;
    const groupIdxs = createUserDto.group ? createUserDto.group : [usersConstant.default.group_idx];
    const groups = await this.groupService.findIdxs(groupIdxs);
    addPrefixUserDto.groups = groups;
    addPrefixUserDto.status = createUserDto.status ? +createUserDto.status : usersConstant.status.registration;

    const user = await this.usersRepository.create({ ...addPrefixUserDto });
    return await this.usersRepository.save(user);
  }

  //회원 존재 여부 체크
  private async checkUserExists(id: string) {
    return await this.usersRepository.findOne({ id: id });
  }
}
