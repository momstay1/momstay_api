import { Injectable, NotFoundException, UnprocessableEntityException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compact, filter, get, isArray, isEmpty, map } from 'lodash';
import { Pagination, PaginationOptions } from 'src/paginate';
import { Brackets, In, MoreThanOrEqual, Repository } from 'typeorm';
import { commonBcrypt } from 'src/common/common.bcrypt';
import { commonUtils } from 'src/common/common.utils';
import { EmailService } from 'src/email/email.service';
import { FileService } from 'src/file/file.service';
import { GroupsService } from 'src/groups/groups.service';
import { UserSnsService } from 'src/user-sns/user-sns.service';
import { DeviceService } from 'src/device/device.service';
import { usersConstant } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/user.entity';
import { Cron } from '@nestjs/schedule';
import { UserLeaveService } from 'src/user-leave/user-leave.service';
import { UserDormantService } from 'src/user-dormant/user-dormant.service';

import * as moment from "moment";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>,
    private readonly groupService: GroupsService,
    private readonly userSnsService: UserSnsService,
    private readonly fileService: FileService,
    private readonly emailService: EmailService,
    private readonly deviceService: DeviceService,
    private readonly userLeaveService: UserLeaveService,
    private readonly userDormantService: UserDormantService,
  ) { }

  async test(id) {
    try {
      throw new NotAcceptableException('123123123');
    } catch (error) {
      console.log({ error });
    }
    return id;
  }

  async email(email: string, type: string) {
    const result = { status: true, message: '', type };
    try {
      await this.findId(email);
      if (type == 'pw') {
        // 비밀번호 재설정 인증코드 발송 성공
        const code = await this.emailService.createCode(email, 0);
        this.emailService.snedMail(
          1,
          email,
          'momstay - Email Authentication',
          `Please enter your email verification code below.
          <br><br>
          Email authentication code : ${code.toUpperCase()}`
        );
        result['message'] = '인증 코드 메일 발송 완료';
      } else {
        // 회원가입 인증코드 발송 실패
        result['status'] = false;
        result['message'] = '인증 코드 메일 발송 실패';
      }
    } catch (error) {
      if (type == 'sign') {
        // 회원가입 인증코드 발송 성공
        const code = await this.emailService.createCode(email, 0);
        this.emailService.snedMail(
          1,
          email,
          'momstay - Email Authentication',
          `Please enter the email authentication code below to register as a member.
          <br><br>
          Email authentication code : ${code.toUpperCase()}`
        );
        result['message'] = '인증 코드 메일 발송 완료';
      } else {
        // 비밀번호 재설정 인증코드 발송 실패
        result['status'] = false;
        result['message'] = '존재하지 않는 이메일';
      }
    }

    return { result };
  }

  async emailChk(email: string, code: string) {
    const email_code = await this.emailService.findEmailCode(code, email);

    const date = moment().add(-10, 'm').format('YYYY-MM-DD HH:mm:ss');
    const create_date = moment(email_code.createdAt).format('YYYY-MM-DD HH:mm:ss');
    if (create_date < date) {
      throw new NotAcceptableException('Authentication timeout.');
    }

    await this.emailService.authCode(code, email);
  }

  async create(createUserDto: CreateUserDto, files) {
    //회원 아이디 중복 체크
    const userChk = await this.checkUserExists(createUserDto.id);
    if (userChk) {
      throw new UnprocessableEntityException('아이디가 중복 됩니다.');
    }

    //회원 정보 저장
    const save_user = await this.saveUser(createUserDto);

    if (get(createUserDto, 'snsInfo', '')) {
      await this.userSnsService.saveUserSns(get(createUserDto, 'snsInfo'), save_user);
    }

    const user = await this.findIdx(save_user['idx']);
    let file_info;
    if (!isEmpty(files)) {
      file_info = await this.fileService.fileInfoInsert(files, save_user['idx']);
    }
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

    if (!get(where, 'group', '')) {
      // 그룹 검색 없는 경우
      const groups = commonUtils.getArrayKey(await this.groupService.findAll(), ['id'], false);
      console.log(map(groups, o => console.log(o['idx'])));
      where['group'] = map(
        commonUtils.getArrayKey(groups, ['id'], false),
        o => {
          if (o['idx'] >= groups[user.group].idx) return o['idx'];
        }
      )
    }

    const [results, total] = await this.usersRepository.createQueryBuilder('users')
      .leftJoinAndSelect('users.userSns', 'userSns')
      .leftJoinAndSelect('users.group', 'group')
      .where(new Brackets(qb => {
        qb.where('users.status IN (:user_status)', { user_status: status_arr });
        get(where, 'group', '') && qb.andWhere('`users`.groupIdx IN (:group)', { group: isArray(get(where, 'group')) ? get(where, 'group') : [get(where, 'group')] })
        get(where, 'language', '') && qb.andWhere('`language`.idx IN (:language)', { language: isArray(get(where, 'language')) ? get(where, 'language') : [get(where, 'language')] })
        get(where, 'id', '') && qb.andWhere('`users`.id LIKE :id', { id: '%' + get(where, 'id') + '%' })
        get(where, 'name', '') && qb.andWhere('`users`.name LIKE :name', { name: '%' + get(where, 'name') + '%' })
        get(where, 'email', '') && qb.andWhere('`users`.email LIKE :email', { email: '%' + get(where, 'email') + '%' })
        get(where, 'phone', '') && qb.andWhere('`users`.phone LIKE :phone', { phone: '%' + get(where, 'phone') + '%' })
        get(where, 'birthday', '') && qb.andWhere('`users`.birthday LIKE :birthday', { birthday: '%' + get(where, 'birthday') + '%' })
        get(where, 'createdAt_mte', '') && qb.andWhere('`users`.`createdAt` >= :createdAt_mte', { createdAt_mte: get(where, 'createdAt_mte') + ' 00:00:00' });
        get(where, 'createdAt_lte', '') && qb.andWhere('`users`.`createdAt` <= :createdAt_lte', { createdAt_lte: get(where, 'createdAt_lte') + ' 23:59:59' });
      }))
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    return new Pagination({
      results,
      total,
      page,
    })
  }

  async count() {
    return await this.usersRepository.count({ where: { user_status: usersConstant.status.registration } });
  }

  async findOne(obj: object): Promise<UsersEntity | undefined> {
    if (isEmpty(obj)) {
      throw new NotFoundException('user.service.fineOne: 조회할 정보가 없습니다.');
    }
    const user = await this.usersRepository.findOne({
      where: obj,
      relations: ['group', 'userSns', 'device', 'block'],
    });
    if (!get(user, 'idx', '')) {
      throw new NotFoundException('user.service.fineOne: 존재하지 않는 회원 입니다.');
    }
    return user;
  }

  async findId(id: string): Promise<UsersEntity | undefined> {
    if (!id) {
      throw new NotFoundException('user.service.fineId: 조회할 정보가 없습니다.');
    }
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: ['group', 'userSns', 'device', 'block'],
    });
    if (!get(user, 'idx', '')) {
      throw new NotFoundException('user.service.fineId: 존재하지 않는 회원 입니다.');
    }

    return user;
  }

  async fineUser(id: string): Promise<UsersEntity | undefined> {
    if (!id) {
      throw new NotFoundException('user.service.fineUser: 조회할 정보가 없습니다.');
    }
    const user = await this.usersRepository.findOne({
      where: (qb) => {
        qb.where('`email` = :email', { email: id })
        qb.orWhere('`UsersEntity`.`id` = :id', { id: id })
      },
      relations: ['group', 'userSns', 'device', 'block'],
    });
    if (!get(user, 'idx', '')) {
      throw new NotFoundException('user.service.fineUser: 존재하지 않는 회원 입니다.');
    }

    return user;
  }

  async findIdx(idx: number): Promise<UsersEntity | undefined> {
    if (!idx) {
      throw new NotFoundException('user.service.findIdx: 조회할 정보가 없습니다.');
    }
    const user = await this.usersRepository.findOne({
      where: { idx: idx },
      relations: ['group', 'userSns', 'device', 'block'],
    });
    if (!get(user, 'idx', '')) {
      throw new NotFoundException('user.service.findIdx: 존재하지 않는 회원 입니다.');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, files) {
    const user = await this.findId(id);
    const groupIdxs = updateUserDto['group'] ? updateUserDto['group'] : usersConstant['default']['group_idx'];
    const group = await this.groupService.findOne(groupIdxs);

    if (get(updateUserDto, 'status', ''))
      user['status'] = +get(updateUserDto, 'status');
    if (get(updateUserDto, 'id', ''))
      user['id'] = get(updateUserDto, 'id');
    if (get(updateUserDto, 'name', ''))
      user['name'] = get(updateUserDto, 'name');
    if (get(updateUserDto, 'email', ''))
      user['email'] = get(updateUserDto, 'email');
    if (get(updateUserDto, 'other', ''))
      user['other'] = get(updateUserDto, 'other');
    if (get(updateUserDto, 'language', ''))
      user['language'] = get(updateUserDto, 'language');
    if (get(updateUserDto, 'gender', ''))
      user['gender'] = get(updateUserDto, 'gender');
    if (get(updateUserDto, 'countryCode', ''))
      user['countryCode'] = get(updateUserDto, 'countryCode');
    if (get(updateUserDto, 'phone', ''))
      user['phone'] = get(updateUserDto, 'phone');
    if (get(updateUserDto, 'birthday', ''))
      user['birthday'] = get(updateUserDto, 'birthday');
    if (get(updateUserDto, 'memo', ''))
      user['memo'] = get(updateUserDto, 'memo');
    if (get(updateUserDto, 'marketing', ''))
      user['marketing'] = get(updateUserDto, 'marketing');
    if (get(updateUserDto, 'uniqueKey', ''))
      user['uniqueKey'] = get(updateUserDto, 'uniqueKey');
    if (get(updateUserDto, 'certifiInfo', ''))
      user['certifiInfo'] = get(updateUserDto, 'certifiInfo');

    user['group'] = group;
    if (get(updateUserDto, 'password')) {
      user['password'] = await commonBcrypt.setBcryptPassword(get(updateUserDto, 'password'));
    }
    const user_data = await this.usersRepository.save(user);

    let file_info;
    if (!isEmpty(files)) {
      const file = await this.fileService.findCategory(['profile'], "" + user_data['idx']);
      const file_idxs = map(file, o => "" + o.file_idx);
      await this.fileService.removes(file_idxs);
      file_info = await this.fileService.fileInfoInsert(files, user_data['idx']);
    }
    return { user: user_data, file_info }
  }

  // 단말기 회원정보 수정
  async updateUser(token: string, userInfo: UsersEntity) {
    const deviceInfo = await this.deviceService.findOneToken(token);

    const user = await this.findId(userInfo.id);
    // 단말기에 연동된 회원과 로그인한 회원이 다른 경우
    if (get(deviceInfo, ['user', 'idx'], '') && deviceInfo['user']['idx'] != user['idx']) {
      // 회원에 연동된 단말기 정보 제거
      const { user } = deviceInfo;
      console.log(deviceInfo['user']);
      user['device'] = null;
      await this.usersRepository.save(user);
      // 단말기에 회원 정보 제거
      deviceInfo['user'] = null;
    }

    user['device'] = deviceInfo;

    await this.usersRepository.save(user);

    return { user };
  }

  async chpw(id: string, password: string) {
    const user = await this.findId(id);

    user.password = await commonBcrypt.setBcryptPassword(password);
    return await this.usersRepository.save(user);
  }

  async rspw(userdata, prevpassword: string, password: string) {
    const user = await this.findId(userdata.id);

    let isHashValid = await commonBcrypt.isHashValid(prevpassword, user.password);
    if (!isHashValid) {
      throw new NotAcceptableException('현재 비밀번호와 일치하지 않습니다.');
    }

    isHashValid = await commonBcrypt.isHashValid(password, user.password);
    if (isHashValid) {
      throw new NotAcceptableException('이전 비밀번호와 동일합니다.');
    }

    user.password = await commonBcrypt.setBcryptPassword(password);
    return await this.usersRepository.save(user);
  }

  async lastActivity(id: string) {
    const user = await this.findId(id);
    user['activitedAt'] = new Date();

    await this.usersRepository.save(user);
  }

  async leave(id: string, reason: string) {
    const user = await this.findId(id);
    const userLeave = await this.userLeaveService.leaveUser(user, reason);
    user.status = usersConstant.status.leave;
    // user.id = '';
    user.password = '';
    user.prevPassword = '';
    user.name = '';
    user.email = '';
    user.gender = '';
    user.language = '';
    user.countryCode = '';
    user.other = '';
    user.phone = '';
    user.birthday = null;
    user.oldData = '';
    user.leaveAt = new Date();
    user.marketing = '0';
    await this.usersRepository.save(user);
  }

  async dormant(user: UsersEntity) {
    const userDormant = await this.userDormantService.dormantUser(user);
    user.status = usersConstant.status.dormant;
    user.name = '';
    user.email = '';
    user.gender = '';
    user.language = '';
    user.countryCode = '';
    user.phone = '';
    user.birthday = null;
    user.other = '';
    user.oldData = '';
    user.marketing = '0';
    await this.usersRepository.save(user);
  }

  async dormantRecovery(id: string) {
    // const user = await this.findId(id);
    const dormantUser = await this.userDormantService.findOneId(id);
    if (get(dormantUser, 'idx', '')) {
      dormantUser.userInfo = JSON.parse(dormantUser.userInfo);
      const { userInfo } = dormantUser;
      const user_data = {
        idx: userInfo['idx'],
        status: usersConstant.status.registration,
        activitedAt: new Date(),
        name: userInfo['name'],
        email: userInfo['email'],
        gender: userInfo['gender'],
        language: userInfo['language'],
        memo: userInfo['memo'],
        countryCode: userInfo['countryCode'],
        other: userInfo['other'],
        phone: userInfo['phone'],
        birthday: userInfo['birthday'],
        oldData: userInfo['oldData'],
        marketing: userInfo['marketing'],
      }
      const userEntity = await this.usersRepository.create(user_data);
      await this.usersRepository.save(userEntity);

      await this.userDormantService.remove(dormantUser.idx);
    }
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
    const groupIdx = createUserDto.group ? createUserDto.group : usersConstant.default.group_idx;
    const group = await this.groupService.findOne(groupIdx);
    addPrefixUserDto.group = group;
    addPrefixUserDto.status = createUserDto.status ? +createUserDto.status : usersConstant.status.registration;

    const user = await this.usersRepository.create({ ...addPrefixUserDto });
    return await this.usersRepository.save(user);
  }

  //회원 존재 여부 체크
  private async checkUserExists(id: string) {
    return await this.usersRepository.findOne({ id: id });
  }

  /******************** cron ********************/
  // cron 테스트
  // @Cron('*/10 * * * * *')
  // async cronTest() {
  //   console.log('[cron] cronTest: ', moment().format('YYYY-MM-DD HH:mm:ss'));
  // }

  // 탈퇴 회원 다음날 01시 uniquekey 제거
  @Cron('0 0 1 * * *')
  async deleteUniqueKey() {
    console.log('[cron] deleteUniqueKey: ', moment().format('YYYY-MM-DD HH:mm:ss'));
    await this.usersRepository.createQueryBuilder()
      .update(UsersEntity)
      .set({ id: '', uniqueKey: '', certifiInfo: '' })
      .where(" status = :status", { status: usersConstant.status.leave })
      .execute()
  }

  // 매일 01시 휴면 회원 안내
  // @Cron('0 0 1 * * *')
  // async dormantNotice() {
  //   console.log('[cron] dormantNotice: ', moment().format('YYYY-MM-DD HH:mm:ss'));
  //   const yearAgo = moment().add(-11, 'month').format('YYYY-MM-DD');
  //   const group = [3]; // 휴면 안내할 그룹
  //   const users = await this.usersRepository.createQueryBuilder('user')
  //     .where(qb => {
  //       qb.where('group.idx IN (:group)', { group: group })
  //       qb.andWhere('user.status = :status', { status: usersConstant.status.registration })
  //       qb.andWhere('user.activitedAt < :activitedAt', { activitedAt: yearAgo })
  //     })
  //     .getMany();
  //   console.log('휴면 회원 안내 숫자: ', users.length);
  //   if (users.length > 0) {
  //     // 휴면 회원 안내
  //     for (const key in users) {
  //       this.emailService.snedMail(
  //         1,
  //         users[key].email,
  //         'momstay - Guidelines for Conversion of Dormant Members',
  //         `Accounts that have not logged in or used the service for more than a year <br>
  //         will be converted to dormant accounts, and personal information will be destroyed or stored and managed separately for safe personal information management.
  //         `
  //       );
  //     }
  //   }
  // }

  // 매일 01시 휴면 회원 처리
  @Cron('0 0 1 * * *')
  // @Cron('*/10 * * * * *') // 테스트용 시간
  async dormantUser() {
    console.log('[cron] dormantUser: ', moment().format('YYYY-MM-DD HH:mm:ss'));
    const yearAgo = moment().add(-1, 'year').format('YYYY-MM-DD');
    const group = [3]; // 휴면 처리할 그룹
    const users = await this.usersRepository.createQueryBuilder('user')
      .leftJoin('user.group', 'group')
      .where(qb => {
        qb.where('group.idx IN (:group)', { group: group })
        qb.andWhere('user.status = :status', { status: usersConstant.status.registration })
        qb.andWhere('user.activitedAt < :activitedAt', { activitedAt: yearAgo })
      })
      .getMany();
    console.log('휴면 회원 숫자: ', users.length);
    if (users.length > 0) {
      // 휴면 회원 처리
      for (const key in users) {
        await this.dormant(users[key]);
      }
    }
  }

}
