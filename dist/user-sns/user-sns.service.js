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
exports.UserSnsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_sns_entity_1 = require("./entities/user-sns.entity");
let UserSnsService = class UserSnsService {
    constructor(userSnsRepository) {
        this.userSnsRepository = userSnsRepository;
    }
    create(createUserSnsDto) {
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
    findOne(id) {
        return `This action returns a #${id} userSn`;
    }
    async findId(id) {
        if (!id) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const snsUser = await this.userSnsRepository.findOne({
            where: { id: id },
            relations: ['user'],
        });
        if (!snsUser) {
            throw new common_1.NotFoundException('존재하지 않는 아이디 입니다.');
        }
        return snsUser;
    }
    update(id, updateUserSnsDto) {
        return `This action updates a #${id} userSn`;
    }
    remove(id) {
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
};
UserSnsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_sns_entity_1.UserSnsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserSnsService);
exports.UserSnsService = UserSnsService;
//# sourceMappingURL=user-sns.service.js.map