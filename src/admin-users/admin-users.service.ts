import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { usersConstant } from 'src/users/constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';
import { AdminUsersEntity } from './entities/admin-user.entity';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUsersEntity) private adminRepository: Repository<AdminUsersEntity>,
  ) { }

  getPrivateColumn(): string[] {
    return usersConstant.privateColumn;
  }
  getAdminPrivateColumn(): string[] {
    return usersConstant.adminPrivateColumn;
  }

  async create(createUserDto: CreateUserDto): Promise<AdminUsersEntity | UnprocessableEntityException> {
    //회원 아이디 중복 체크
    const user = await this.checkAdminExists(createUserDto.id);
    if (user) {
      throw new UnprocessableEntityException('아이디가 중복 됩니다.');
    }
    //회원 정보 저장
    return await this.saveAdmin(createUserDto);
  }

  async findOne(id: string): Promise<AdminUsersEntity | undefined> {
    if (!id) {
      throw new NotFoundException('존재하지 않는 아이디 입니다.');
    }

    const user = await this.adminRepository.findOne({
      where: { admin_id: id },
      relations: ['admin_group'],
    });
    if (!user) {
      throw new NotFoundException('존재하지 않는 아이디 입니다.');
    }

    return user;
  }

  //관리자 존재 여부 체크
  private async checkAdminExists(id: string) {
    return await this.adminRepository.findOne({ admin_id: id });
  }

  //회원 정보 저장
  private async saveAdmin(createUserDto): Promise<any> {
    const addPrefixAdminDto = commonUtils.addPrefix(usersConstant.adminPrefix, createUserDto);
    addPrefixAdminDto.admin_group = get(createUserDto, 'group', usersConstant.admin.group_idx);
    const admin = await this.adminRepository.create({ ...addPrefixAdminDto });
    return await this.adminRepository.save(admin);
  }
}
