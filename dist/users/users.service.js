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
const moment = require("moment");
const common_bcrypt_1 = require("../common/common.bcrypt");
const common_utils_1 = require("../common/common.utils");
const email_service_1 = require("../email/email.service");
const file_service_1 = require("../file/file.service");
const groups_service_1 = require("../groups/groups.service");
const paginate_1 = require("../paginate");
const user_sns_service_1 = require("../user-sns/user-sns.service");
const typeorm_2 = require("typeorm");
const constants_1 = require("./constants");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository, groupService, userSnsService, fileService, emailService) {
        this.usersRepository = usersRepository;
        this.groupService = groupService;
        this.userSnsService = userSnsService;
        this.fileService = fileService;
        this.emailService = emailService;
    }
    async test(id) {
        this.emailService.createCode('shjeon2500@naver.com', 0);
        return id;
    }
    async email(email) {
        try {
            await this.findId(email);
        }
        catch (error) {
            const code = await this.emailService.createCode('shjeon2500@naver.com', 0);
            this.emailService.snedMail(1, email, 'momstay - Email Authentication', `Please enter the email authentication code below to register as a member.
        <br><br>
        Email authentication code : ${code}`);
        }
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
        if (files) {
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
        const group = await this.groupService.findOneName(user.group);
        const data = await this.usersRepository.createQueryBuilder('users')
            .addSelect('`groups`.idx AS groups_idx')
            .leftJoin('users.groups', 'groups')
            .leftJoin('users.userSns', 'userSns')
            .where(new typeorm_2.Brackets(qb => {
            qb.where('users.status IN (:user_status)', { user_status: status_arr });
            (0, lodash_1.get)(where, 'group', '') && qb.andWhere('`groups`.idx IN (:group)', { group: (0, lodash_1.get)(where, 'group') });
            (0, lodash_1.get)(where, 'language', '') && qb.andWhere('`language`.idx IN (:language)', { language: (0, lodash_1.get)(where, 'language') });
            (0, lodash_1.get)(where, 'id', '') && qb.andWhere('`users`.id LIKE :id', { id: '%' + (0, lodash_1.get)(where, 'id') + '%' });
            (0, lodash_1.get)(where, 'name', '') && qb.andWhere('`users`.name LIKE :name', { name: '%' + (0, lodash_1.get)(where, 'name') + '%' });
            (0, lodash_1.get)(where, 'email', '') && qb.andWhere('`users`.email LIKE :email', { email: '%' + (0, lodash_1.get)(where, 'email') + '%' });
            (0, lodash_1.get)(where, 'phone', '') && qb.andWhere('`users`.phone LIKE :phone', { phone: '%' + (0, lodash_1.get)(where, 'phone') + '%' });
            (0, lodash_1.get)(where, 'birthday', '') && qb.andWhere('`users`.birthday LIKE :birthday', { birthday: '%' + (0, lodash_1.get)(where, 'birthday') + '%' });
            (0, lodash_1.get)(where, 'createdAt_mte', '') && qb.andWhere('`users`.`createdAt` >= :createdAt_mte', { createdAt_mte: (0, lodash_1.get)(where, 'createdAt_mte') + ' 00:00:00' });
            (0, lodash_1.get)(where, 'createdAt_lte', '') && qb.andWhere('`users`.`createdAt` <= :createdAt_lte', { createdAt_lte: (0, lodash_1.get)(where, 'createdAt_lte') + ' 23:59:59' });
        }))
            .groupBy('users_idx')
            .having('MIN(`groups`.`idx`) >= :group_idx', { group_idx: group.idx })
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getMany();
        const user_idxs = (0, lodash_1.map)(data, (o) => o.idx);
        const [results, total] = await this.usersRepository.findAndCount({
            where: { idx: (0, typeorm_2.In)(user_idxs) },
            relations: ['groups', 'userSns'],
        });
        return new paginate_1.Pagination({
            results,
            total,
        });
    }
    async count() {
        return await this.usersRepository.count({ where: { user_status: constants_1.usersConstant.status.registration } });
    }
    async findOne(obj) {
        if ((0, lodash_1.isEmpty)(obj)) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const user = await this.usersRepository.findOne({
            where: obj,
            relations: ['groups', 'userSns', 'login'],
        });
        if (!user) {
            throw new common_1.NotFoundException('존재하지 않는 회원 입니다.');
        }
        return user;
    }
    async findId(id) {
        if (!id) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const user = await this.usersRepository.findOne({
            where: { id: id },
            relations: ['groups', 'userSns', 'login'],
        });
        if (!user) {
            throw new common_1.NotFoundException('존재하지 않는 회원 입니다.');
        }
        return user;
    }
    async fineUser(id) {
        if (!id) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const user = await this.usersRepository.findOne({
            where: (qb) => {
                qb.where('`email` = :email', { email: id });
                qb.orWhere('`UsersEntity`.`id` = :id', { id: id });
            },
            relations: ['groups', 'userSns', 'login'],
        });
        if (!user) {
            throw new common_1.NotFoundException('존재하지 않는 회원 입니다.');
        }
        return user;
    }
    async findIdx(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const user = await this.usersRepository.findOne({
            where: { idx: idx },
            relations: ['groups', 'userSns'],
        });
        if (!user) {
            throw new common_1.NotFoundException('존재하지 않는 회원 입니다.');
        }
        return user;
    }
    async update(id, updateUserDto, files) {
        const user = await this.findId(id);
        const groupIdxs = updateUserDto.group ? updateUserDto.group : [constants_1.usersConstant.default.group_idx];
        const groups = await this.groupService.findIdxs(groupIdxs);
        user.name = updateUserDto.name;
        user.status = +(0, lodash_1.get)(updateUserDto, 'status', constants_1.usersConstant.status.registration);
        user.name = (0, lodash_1.get)(updateUserDto, 'name', '');
        user.email = (0, lodash_1.get)(updateUserDto, 'email', '');
        user.other = (0, lodash_1.get)(updateUserDto, 'other', '');
        user.language = (0, lodash_1.get)(updateUserDto, 'language', '');
        user.gender = (0, lodash_1.get)(updateUserDto, 'gender', '');
        user.countryCode = (0, lodash_1.get)(updateUserDto, 'countryCode', '');
        user.phone = (0, lodash_1.get)(updateUserDto, 'phone', '');
        user.birthday = (0, lodash_1.get)(updateUserDto, 'birthday', '0000-00-00');
        user.memo = (0, lodash_1.get)(updateUserDto, 'memo', '');
        user.groups = groups;
        if ((0, lodash_1.get)(updateUserDto, 'password')) {
            user.password = await common_bcrypt_1.commonBcrypt.setBcryptPassword((0, lodash_1.get)(updateUserDto, 'password'));
        }
        return await this.usersRepository.save(user);
    }
    async remove(id) {
        const user = await this.findId(id);
        user.status = constants_1.usersConstant.status.delete;
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
        const groupIdxs = createUserDto.group ? createUserDto.group : [constants_1.usersConstant.default.group_idx];
        const groups = await this.groupService.findIdxs(groupIdxs);
        addPrefixUserDto.groups = groups;
        addPrefixUserDto.status = createUserDto.status ? +createUserDto.status : constants_1.usersConstant.status.registration;
        const user = await this.usersRepository.create(Object.assign({}, addPrefixUserDto));
        return await this.usersRepository.save(user);
    }
    async checkUserExists(id) {
        return await this.usersRepository.findOne({ id: id });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        groups_service_1.GroupsService,
        user_sns_service_1.UserSnsService,
        file_service_1.FileService,
        email_service_1.EmailService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map