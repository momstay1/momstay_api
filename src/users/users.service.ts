import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { Pagination, PaginationOptions } from 'src/paginate';
import { Repository } from 'typeorm';
import { usersConstant } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>
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
    const { take, page } = options;
    const [results, total] = await this.usersRepository.findAndCount({
      order: { user_createdAt: 'DESC' },
      where: { user_status: usersConstant.status.registration },
      relations: ['user_group'],
      take: take,
      skip: take * (page - 1)
    });
    return new Pagination({
      results,
      total,
    })
  }

  async findOne(id: string): Promise<UsersEntity | undefined> {
    if (!id) {
      throw new NotFoundException('존재하지 않는 아이디 입니다.');
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

    user.user_name = updateUserDto.name;
    user.user_email = get(updateUserDto, 'email', '');
    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    user.user_status = usersConstant.status.delete;
    await this.usersRepository.save(user);
  }

  getPrivateColumn(): string[] {
    return usersConstant.privateColumn;
  }

  //회원 정보 저장
  private async saveUser(createUserDto): Promise<any> {
    const addPrefixUserDto = commonUtils.addPrefix(usersConstant.prefix, createUserDto);
    addPrefixUserDto.user_group = get(createUserDto, 'group', usersConstant.default.group_idx);
    const user = await this.usersRepository.create({ ...addPrefixUserDto });
    return await this.usersRepository.save(user);
  }

  //회원 존재 여부 체크
  private async checkUserExists(id: string) {
    return await this.usersRepository.findOne({ user_id: id });
  }
}
