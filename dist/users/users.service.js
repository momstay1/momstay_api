"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const paginate_1 = require("../paginate");
const typeorm_2 = require("typeorm");
const common_bcrypt_1 = require("../common/common.bcrypt");
const common_utils_1 = require("../common/common.utils");
const email_service_1 = require("../email/email.service");
const file_service_1 = require("../file/file.service");
const groups_service_1 = require("../groups/groups.service");
const user_sns_service_1 = require("../user-sns/user-sns.service");
const device_service_1 = require("../device/device.service");
const constants_1 = require("./constants");
const user_entity_1 = require("./entities/user.entity");
const schedule_1 = require("@nestjs/schedule");
const moment = require("moment");
let UsersService = class UsersService {
    constructor(usersRepository, groupService, userSnsService, fileService, emailService, deviceService) {
        this.usersRepository = usersRepository;
        this.groupService = groupService;
        this.userSnsService = userSnsService;
        this.fileService = fileService;
        this.emailService = emailService;
        this.deviceService = deviceService;
    }
    async test(id) {
        try {
            throw new common_1.NotAcceptableException('123123123');
        }
        catch (error) {
            console.log({ error });
        }
        return id;
    }
    async email(email, type) {
        const result = { status: true, message: '', type };
        try {
            await this.findId(email);
            if (type == 'pw') {
                const code = await this.emailService.createCode(email, 0);
                this.emailService.snedMail(1, email, 'momstay - Email Authentication', `Please enter your email verification code below.
          <br><br>
          Email authentication code : ${code.toUpperCase()}`);
                result['message'] = '인증 코드 메일 발송 완료';
            }
            else {
                result['status'] = false;
                result['message'] = '인증 코드 메일 발송 실패';
            }
        }
        catch (error) {
            if (type == 'sign') {
                const code = await this.emailService.createCode(email, 0);
                this.emailService.snedMail(1, email, 'momstay - Email Authentication', `Please enter the email authentication code below to register as a member.
          <br><br>
          Email authentication code : ${code.toUpperCase()}`);
                result['message'] = '인증 코드 메일 발송 완료';
            }
            else {
                result['status'] = false;
                result['message'] = '존재하지 않는 이메일';
            }
        }
        return { result };
    }
    async emailChk(email, code) {
        const email_code = await this.emailService.findEmailCode(code, email);
        const date = moment().add(-10, 'm').format('YYYY-MM-DD HH:mm:ss');
        const create_date = moment(email_code.createdAt).format('YYYY-MM-DD HH:mm:ss');
        if (create_date < date) {
            throw new common_1.NotAcceptableException('Authentication timeout.');
        }
        await this.emailService.authCode(code, email);
    }
    async create(createUserDto, files) {
        const userChk = await this.checkUserExists(createUserDto.id);
        if (userChk) {
            throw new common_1.UnprocessableEntityException('아이디가 중복 됩니다.');
        }
        const save_user = await this.saveUser(createUserDto);
        if ((0, lodash_1.get)(createUserDto, 'snsInfo', '')) {
            await this.userSnsService.saveUserSns((0, lodash_1.get)(createUserDto, 'snsInfo'), save_user);
        }
        const user = await this.findIdx(save_user['idx']);
        let file_info;
        if (!(0, lodash_1.isEmpty)(files)) {
            file_info = await this.fileService.fileInfoInsert(files, save_user['idx']);
        }
        return { user, file_info };
    }
    async findAll(user, options, search) {
        const { take, page } = options;
        const status_arr = [];
        for (const key in constants_1.usersConstant.status) {
            if (key != 'delete') {
                status_arr.push(constants_1.usersConstant.status[key]);
            }
        }
        const where = common_utils_1.commonUtils.searchSplit(search);
        if (!(0, lodash_1.get)(where, 'group', '')) {
            const groups = common_utils_1.commonUtils.getArrayKey(await this.groupService.findAll(), ['id'], false);
            console.log((0, lodash_1.map)(groups, o => console.log(o['idx'])));
            where['group'] = (0, lodash_1.map)(common_utils_1.commonUtils.getArrayKey(groups, ['id'], false), o => {
                if (o['idx'] >= groups[user.group].idx)
                    return o['idx'];
            });
        }
        const [results, total] = await this.usersRepository.createQueryBuilder('users')
            .leftJoinAndSelect('users.userSns', 'userSns')
            .leftJoinAndSelect('users.group', 'group')
            .where(new typeorm_2.Brackets(qb => {
            qb.where('users.status IN (:user_status)', { user_status: status_arr });
            (0, lodash_1.get)(where, 'group', '') && qb.andWhere('`users`.groupIdx IN (:group)', { group: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'group')) ? (0, lodash_1.get)(where, 'group') : [(0, lodash_1.get)(where, 'group')] });
            (0, lodash_1.get)(where, 'language', '') && qb.andWhere('`language`.idx IN (:language)', { language: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'language')) ? (0, lodash_1.get)(where, 'language') : [(0, lodash_1.get)(where, 'language')] });
            (0, lodash_1.get)(where, 'id', '') && qb.andWhere('`users`.id LIKE :id', { id: '%' + (0, lodash_1.get)(where, 'id') + '%' });
            (0, lodash_1.get)(where, 'name', '') && qb.andWhere('`users`.name LIKE :name', { name: '%' + (0, lodash_1.get)(where, 'name') + '%' });
            (0, lodash_1.get)(where, 'email', '') && qb.andWhere('`users`.email LIKE :email', { email: '%' + (0, lodash_1.get)(where, 'email') + '%' });
            (0, lodash_1.get)(where, 'phone', '') && qb.andWhere('`users`.phone LIKE :phone', { phone: '%' + (0, lodash_1.get)(where, 'phone') + '%' });
            (0, lodash_1.get)(where, 'birthday', '') && qb.andWhere('`users`.birthday LIKE :birthday', { birthday: '%' + (0, lodash_1.get)(where, 'birthday') + '%' });
            (0, lodash_1.get)(where, 'createdAt_mte', '') && qb.andWhere('`users`.`createdAt` >= :createdAt_mte', { createdAt_mte: (0, lodash_1.get)(where, 'createdAt_mte') + ' 00:00:00' });
            (0, lodash_1.get)(where, 'createdAt_lte', '') && qb.andWhere('`users`.`createdAt` <= :createdAt_lte', { createdAt_lte: (0, lodash_1.get)(where, 'createdAt_lte') + ' 23:59:59' });
        }))
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        return new paginate_1.Pagination({
            results,
            total,
            page,
        });
    }
    async count() {
        return await this.usersRepository.count({ where: { user_status: constants_1.usersConstant.status.registration } });
    }
    async findOne(obj) {
        if ((0, lodash_1.isEmpty)(obj)) {
            throw new common_1.NotFoundException('user.service.fineOne: 조회할 정보가 없습니다.');
        }
        const user = await this.usersRepository.findOne({
            where: obj,
            relations: ['group', 'userSns', 'device', 'block'],
        });
        if (!user) {
            throw new common_1.NotFoundException('user.service.fineOne: 존재하지 않는 회원 입니다.');
        }
        return user;
    }
    async findId(id) {
        if (!id) {
            throw new common_1.NotFoundException('user.service.fineId: 조회할 정보가 없습니다.');
        }
        const user = await this.usersRepository.findOne({
            where: { id: id },
            relations: ['group', 'userSns', 'device', 'block'],
        });
        if (!user) {
            throw new common_1.NotFoundException('user.service.fineId: 존재하지 않는 회원 입니다.');
        }
        return user;
    }
    async fineUser(id) {
        if (!id) {
            throw new common_1.NotFoundException('user.service.fineUser: 조회할 정보가 없습니다.');
        }
        const user = await this.usersRepository.findOne({
            where: (qb) => {
                qb.where('`email` = :email', { email: id });
                qb.orWhere('`UsersEntity`.`id` = :id', { id: id });
            },
            relations: ['group', 'userSns', 'device', 'block'],
        });
        if (!user) {
            throw new common_1.NotFoundException('user.service.fineUser: 존재하지 않는 회원 입니다.');
        }
        return user;
    }
    async findIdx(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('user.service.findIdx: 조회할 정보가 없습니다.');
        }
        const user = await this.usersRepository.findOne({
            where: { idx: idx },
            relations: ['group', 'userSns', 'device', 'block'],
        });
        if (!user) {
            throw new common_1.NotFoundException('user.service.findIdx: 존재하지 않는 회원 입니다.');
        }
        return user;
    }
    async update(id, updateUserDto, files) {
        const user = await this.findId(id);
        const groupIdxs = updateUserDto['group'] ? updateUserDto['group'] : constants_1.usersConstant['default']['group_idx'];
        const group = await this.groupService.findOne(groupIdxs);
        if ((0, lodash_1.get)(updateUserDto, 'status', ''))
            user['status'] = +(0, lodash_1.get)(updateUserDto, 'status');
        if ((0, lodash_1.get)(updateUserDto, 'id', ''))
            user['id'] = (0, lodash_1.get)(updateUserDto, 'id');
        if ((0, lodash_1.get)(updateUserDto, 'name', ''))
            user['name'] = (0, lodash_1.get)(updateUserDto, 'name');
        if ((0, lodash_1.get)(updateUserDto, 'email', ''))
            user['email'] = (0, lodash_1.get)(updateUserDto, 'email');
        if ((0, lodash_1.get)(updateUserDto, 'other', ''))
            user['other'] = (0, lodash_1.get)(updateUserDto, 'other');
        if ((0, lodash_1.get)(updateUserDto, 'language', ''))
            user['language'] = (0, lodash_1.get)(updateUserDto, 'language');
        if ((0, lodash_1.get)(updateUserDto, 'gender', ''))
            user['gender'] = (0, lodash_1.get)(updateUserDto, 'gender');
        if ((0, lodash_1.get)(updateUserDto, 'countryCode', ''))
            user['countryCode'] = (0, lodash_1.get)(updateUserDto, 'countryCode');
        if ((0, lodash_1.get)(updateUserDto, 'phone', ''))
            user['phone'] = (0, lodash_1.get)(updateUserDto, 'phone');
        if ((0, lodash_1.get)(updateUserDto, 'birthday', ''))
            user['birthday'] = (0, lodash_1.get)(updateUserDto, 'birthday');
        if ((0, lodash_1.get)(updateUserDto, 'memo', ''))
            user['memo'] = (0, lodash_1.get)(updateUserDto, 'memo');
        if ((0, lodash_1.get)(updateUserDto, 'marketing', ''))
            user['marketing'] = (0, lodash_1.get)(updateUserDto, 'marketing');
        if ((0, lodash_1.get)(updateUserDto, 'uniqueKey', ''))
            user['marketing'] = (0, lodash_1.get)(updateUserDto, 'uniqueKey');
        if ((0, lodash_1.get)(updateUserDto, 'certifiInfo', ''))
            user['marketing'] = (0, lodash_1.get)(updateUserDto, 'certifiInfo');
        user['group'] = group;
        if ((0, lodash_1.get)(updateUserDto, 'password')) {
            user['password'] = await common_bcrypt_1.commonBcrypt.setBcryptPassword((0, lodash_1.get)(updateUserDto, 'password'));
        }
        const user_data = await this.usersRepository.save(user);
        let file_info;
        if (!(0, lodash_1.isEmpty)(files)) {
            const file = await this.fileService.findCategory(['profile'], "" + user_data['idx']);
            const file_idxs = (0, lodash_1.map)(file, o => "" + o.file_idx);
            await this.fileService.removes(file_idxs);
            file_info = await this.fileService.fileInfoInsert(files, user_data['idx']);
        }
        return { user: user_data, file_info };
    }
    async updateUser(token, userInfo) {
        const deviceInfo = await this.deviceService.findOneToken(token);
        const user = await this.findId(userInfo.id);
        if ((0, lodash_1.get)(deviceInfo, ['user', 'idx'], '') && deviceInfo['user']['idx'] != user['idx']) {
            const { user } = deviceInfo;
            console.log(deviceInfo['user']);
            user['device'] = null;
            await this.usersRepository.save(user);
            deviceInfo['user'] = null;
        }
        user['device'] = deviceInfo;
        await this.usersRepository.save(user);
        return { user };
    }
    async chpw(id, password) {
        const user = await this.findId(id);
        user.password = await common_bcrypt_1.commonBcrypt.setBcryptPassword(password);
        return await this.usersRepository.save(user);
    }
    async rspw(userdata, prevpassword, password) {
        const user = await this.findId(userdata.id);
        let isHashValid = await common_bcrypt_1.commonBcrypt.isHashValid(prevpassword, user.password);
        if (!isHashValid) {
            throw new common_1.NotAcceptableException('현재 비밀번호와 일치하지 않습니다.');
        }
        isHashValid = await common_bcrypt_1.commonBcrypt.isHashValid(password, user.password);
        if (isHashValid) {
            throw new common_1.NotAcceptableException('이전 비밀번호와 동일합니다.');
        }
        user.password = await common_bcrypt_1.commonBcrypt.setBcryptPassword(password);
        return await this.usersRepository.save(user);
    }
    async leave(id) {
        const user = await this.findId(id);
        user.status = constants_1.usersConstant.status.leave;
        user.id = '';
        user.password = '';
        user.prevPassword = '';
        user.name = '';
        user.email = '';
        user.gender = '';
        user.phone = '';
        user.birthday = '0000-00-00';
        user.other = '';
        user.oldData = '';
        user.oldData = '';
        user.leaveAt = new Date(moment().format('YYYY-MM-DD'));
        user.marketing = '0';
        await this.usersRepository.save(user);
    }
    async removes(ids) {
        if (ids.length <= 0) {
            throw new common_1.NotFoundException('삭제할 정보가 없습니다.');
        }
        await this.usersRepository.createQueryBuilder()
            .update(user_entity_1.UsersEntity)
            .set({ status: Number(constants_1.usersConstant.status.delete) })
            .where(" id IN (:ids)", { ids: ids })
            .execute();
    }
    getPrivateColumn() {
        return constants_1.usersConstant.privateColumn;
    }
    async saveUser(createUserDto) {
        const addPrefixUserDto = createUserDto;
        const groupIdx = createUserDto.group ? createUserDto.group : constants_1.usersConstant.default.group_idx;
        const group = await this.groupService.findOne(groupIdx);
        addPrefixUserDto.group = group;
        addPrefixUserDto.status = createUserDto.status ? +createUserDto.status : constants_1.usersConstant.status.registration;
        const user = await this.usersRepository.create(Object.assign({}, addPrefixUserDto));
        return await this.usersRepository.save(user);
    }
    async checkUserExists(id) {
        return await this.usersRepository.findOne({ id: id });
    }
    async deleteUniqueKey() {
        console.log('[cron] deleteUniqueKey: ', moment().format('YYYY-MM-DD HH:mm:ss'));
        await this.usersRepository.createQueryBuilder()
            .update(user_entity_1.UsersEntity)
            .set({ uniqueKey: '', certifiInfo: '' })
            .where(" status = :status", { status: constants_1.usersConstant.status.leave })
            .execute();
    }
};
__decorate([
    (0, schedule_1.Cron)('0 0 1 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "deleteUniqueKey", null);
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        groups_service_1.GroupsService,
        user_sns_service_1.UserSnsService,
        file_service_1.FileService,
        email_service_1.EmailService,
        device_service_1.DeviceService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map