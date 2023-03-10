import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { commonBcrypt } from 'src/common/common.bcrypt';
import { commonUtils } from 'src/common/common.utils';
import { GroupsService } from 'src/groups/groups.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { usersConstant } from 'src/users/constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { AdminUsersEntity } from './entities/admin-user.entity';

@Injectable()
export class AdminUsersService {
  // constructor(
  //   @InjectRepository(AdminUsersEntity) private adminRepository: Repository<AdminUsersEntity>,
  //   private readonly groupService: GroupsService,
  // ) { }

  // getPrivateColumn(): string[] {
  //   return usersConstant.privateColumn;
  // }
  // getAdminPrivateColumn(): string[] {
  //   return usersConstant.adminPrivateColumn;
  // }

  // async create(createUserDto: CreateUserDto): Promise<AdminUsersEntity | UnprocessableEntityException> {
  //   //회원 아이디 중복 체크
  //   const user = await this.checkAdminExists(createUserDto.id);
  //   if (user) {
  //     throw new UnprocessableEntityException('아이디가 중복 됩니다.');
  //   }
  //   //회원 정보 저장
  //   return await this.saveAdmin(createUserDto);
  // }

  // async findAll(admin, options: PaginationOptions) {
  //   // return await this.usersRepository.find();
  //   const status_arr: number[] = [];
  //   for (const key in usersConstant.status) {
  //     if (key != 'delete') {
  //       status_arr.push(usersConstant.status[key]);
  //     }
  //   }
  //   const group = await this.groupService.findOneName(admin.user_group);

  //   const { take, page } = options;
  //   const [results, total] = await this.adminRepository.findAndCount({
  //     order: { admin_createdAt: 'DESC' },
  //     where: { admin_status: In(status_arr), admin_group: MoreThanOrEqual(group.idx) },
  //     relations: ['admin_group'],
  //     take: take,
  //     skip: take * (page - 1)
  //   });
  //   return new Pagination({
  //     results,
  //     total,
  //     page,
  //   })
  // }

  // async findOne(id: string): Promise<AdminUsersEntity | undefined> {
  //   if (!id) {
  //     throw new NotFoundException('존재하지 않는 아이디 입니다.');
  //   }

  //   const user = await this.adminRepository.findOne({
  //     where: { admin_id: id },
  //     relations: ['admin_group'],
  //   });
  //   if (!user) {
  //     throw new NotFoundException('존재하지 않는 아이디 입니다.');
  //   }

  //   return user;
  // }

  // async update(id: string, updateUserDto: UpdateUserDto) {
  //   const admin = await this.findOne(id);
  //   let group_idx = updateUserDto.group;
  //   if (get(updateUserDto, 'group') == "3") {
  //     group_idx = "" + usersConstant.admin.group_idx;
  //   }
  //   const group = await this.groupService.findOne(+group_idx);

  //   admin.admin_name = updateUserDto.name;
  //   admin.admin_status = +get(updateUserDto, 'status', usersConstant.status.registration);
  //   admin.admin_email = get(updateUserDto, 'email', '');
  //   admin.admin_phone = get(updateUserDto, 'phone', '');
  //   admin.admin_memo = get(updateUserDto, 'memo', '');
  //   if (get(updateUserDto, 'password')) {
  //     admin.admin_password = await commonBcrypt.setBcryptPassword(get(updateUserDto, 'password'));
  //   }
  //   return await this.adminRepository.save(admin);
  // }

  // async count(user) {
  //   const group = await this.groupService.findOneName(user.user_group);

  //   return await this.adminRepository.count({
  //     where: {
  //       admin_status: usersConstant.status.registration,
  //       admin_group: MoreThanOrEqual(group.idx)
  //     }
  //   });
  // }

  // async removes(admin_ids) {
  //   if (admin_ids.length <= 0) {
  //     throw new NotFoundException('삭제할 정보가 없습니다.');
  //   }
  //   await this.adminRepository.createQueryBuilder()
  //     .update()
  //     .set({ admin_status: Number(usersConstant.status.delete) })
  //     .where(" admin_id IN (:admin_ids)", { admin_ids: admin_ids })
  //     .execute()
  // }

  // //관리자 존재 여부 체크
  // private async checkAdminExists(id: string) {
  //   return await this.adminRepository.findOne({ admin_id: id });
  // }

  // //회원 정보 저장
  // private async saveAdmin(createUserDto): Promise<any> {
  //   const addPrefixAdminDto = commonUtils.addPrefix(usersConstant.adminPrefix, createUserDto);
  //   addPrefixAdminDto.admin_group = get(createUserDto, 'group', usersConstant.admin.group_idx);
  //   const admin = await this.adminRepository.create({ ...addPrefixAdminDto });
  //   return await this.adminRepository.save(admin);
  // }
}
