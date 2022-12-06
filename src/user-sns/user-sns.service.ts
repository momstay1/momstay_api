import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserSnsDto } from './dto/create-user-sns.dto';
import { UpdateUserSnsDto } from './dto/update-user-sns.dto';
import { UserSnsEntity } from './entities/user-sns.entity';

@Injectable()
export class UserSnsService {
  constructor(
    @InjectRepository(UserSnsEntity) private userSnsRepository: Repository<UserSnsEntity>,
  ) { }

  create(createUserSnsDto: CreateUserSnsDto) {
    return 'This action adds a new userSn';
  }

  findAll() {
    return `This action returns all userSns`;
  }

  async findAllUserIdx(user_idxs) {
    return await this.userSnsRepository.createQueryBuilder()
      .select()
      .where('userIdx IN (:user_idxs)', { user_idxs: user_idxs })
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} userSn`;
  }

  async findId(id: string): Promise<UserSnsEntity | undefined> {
    if (!id) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const snsUser = await this.userSnsRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
    if (!snsUser) {
      throw new NotFoundException('존재하지 않는 아이디 입니다.');
    }

    return snsUser;
  }

  update(id: number, updateUserSnsDto: UpdateUserSnsDto) {
    return `This action updates a #${id} userSn`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSn`;
  }

  async saveUserSns(snsInfo, user) {
    const userSns = {
      id: snsInfo.id,
      status: 1,
      type: user.type,
      info: snsInfo,
      user: user.idx
    };
    const data = await this.userSnsRepository.create(userSns);
    await this.userSnsRepository.save(data);
  }
}
