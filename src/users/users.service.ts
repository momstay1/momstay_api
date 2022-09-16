import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { commonBcrypt } from 'src/common/common.bcrypt';
import { commonUtils } from 'src/common/common.utils';
import { GroupsService } from 'src/groups/groups.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { In, Repository } from 'typeorm';
import { usersConstant } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>,
    private readonly groupService: GroupsService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UsersEntity | UnprocessableEntityException> {
    //회원 아이디 중복 체크
    const user = await this.checkUserExists(createUserDto.id);
    if (user) {
      throw new UnprocessableEntityException('아이디가 중복 됩니다.');
    }

    //회원 정보 저장
    return await this.saveUser(createUserDto);;
  }

  async findAll(options: PaginationOptions) {
    // return await this.usersRepository.find();
    const status_arr: number[] = [];
    for (const key in usersConstant.status) {
      if (key != 'delete') {
        status_arr.push(usersConstant.status[key]);
      }
    }
    const { take, page } = options;
    const [results, total] = await this.usersRepository.findAndCount({
      order: { user_createdAt: 'DESC' },
      where: { user_status: In(status_arr) },
      relations: ['user_group'],
      take: take,
      skip: take * (page - 1)
    });
    return new Pagination({
      results,
      total,
    })
  }

  async count() {
    return await this.usersRepository.count({ where: { user_status: usersConstant.status.registration } });
  }

  async findOne(id: string): Promise<UsersEntity | undefined> {
    if (!id) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const user = await this.usersRepository.findOne({
      where: { user_id: id },
      relations: ['user_group'],
    });
    if (!user) {
      throw new NotFoundException('존재하지 않는 아이디 입니다.');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    let group_idx = get(updateUserDto, 'group', usersConstant.default.group_idx);
    if (get(updateUserDto, 'group') == "1") {
      group_idx = usersConstant.default.group_idx;
    }
    const group = await this.groupService.findOne(Number(group_idx));

    user.user_name = updateUserDto.name;
    user.user_status = +get(updateUserDto, 'status', usersConstant.status.registration);
    user.user_email = get(updateUserDto, 'email', '');
    user.user_phone = get(updateUserDto, 'phone', '');
    user.user_memo = get(updateUserDto, 'memo', '');
    user.user_place_idx = +get(updateUserDto, 'place_idx', 0);
    user.user_group = group;
    if (get(updateUserDto, 'password')) {
      user.user_password = await commonBcrypt.setBcryptPassword(get(updateUserDto, 'password'));
    }
    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    user.user_status = usersConstant.status.delete;
    await this.usersRepository.save(user);
  }

  async removes(user_ids) {
    if (user_ids.length <= 0) {
      throw new NotFoundException('삭제할 정보가 없습니다.');
    }
    await this.usersRepository.createQueryBuilder()
      .update(UsersEntity)
      .set({ user_status: Number(usersConstant.status.delete) })
      .where(" user_id IN (:user_ids)", { user_ids: user_ids })
      .execute()
  }

  getPrivateColumn(): string[] {
    return usersConstant.privateColumn;
  }

  //회원 정보 저장
  private async saveUser(createUserDto): Promise<any> {
    const addPrefixUserDto = commonUtils.addPrefix(usersConstant.prefix, createUserDto);
    addPrefixUserDto.user_group = createUserDto.group ? createUserDto.group : usersConstant.default.group_idx;
    addPrefixUserDto.user_status = createUserDto.status ? +createUserDto.status : usersConstant.status.registration;
    const user = await this.usersRepository.create({ ...addPrefixUserDto });
    return await this.usersRepository.save(user);
  }

  //회원 존재 여부 체크
  private async checkUserExists(id: string) {
    return await this.usersRepository.findOne({ user_id: id });
  }
}
