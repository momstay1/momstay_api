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
exports.BlockService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const block_entity_1 = require("./entities/block.entity");
let BlockService = class BlockService {
    constructor(blockRepository, usersService) {
        this.blockRepository = blockRepository;
        this.usersService = usersService;
    }
    async create(userInfo, createBlockDto) {
        const { blockUserIdx } = createBlockDto;
        const blockUserInfo = await this.usersService.findIdx(blockUserIdx);
        const user = await this.usersService.findId(userInfo['id']);
        const blockInfo = user['block'];
        const blockUser = (0, lodash_1.filter)(blockInfo, o => o['blockUserIdx'] == blockUserIdx);
        if (blockUser.length > 0) {
            throw new common_1.NotAcceptableException('block.service.create: 이미 차단한 회원입니다.');
        }
        const block_data = {
            blockUserIdx,
            user
        };
        const blockEntity = await this.blockRepository.create(block_data);
        const block = await this.blockRepository.save(blockEntity);
        return { block };
    }
    async findAllUser(userIdx) {
        if (!userIdx) {
            throw new common_1.NotFoundException('block.service.findAllUser: 조회할 회원 정보가 없습니다.');
        }
        const block = await this.blockRepository.find({
            where: { user: { idx: userIdx } },
            relations: ['user']
        });
        if (block.length <= 0) {
            throw new common_1.NotFoundException('block.service.findAllUser: 조회된 차단 목록이 없습니다.');
        }
        return block;
    }
    findOne(id) {
        return `This action returns a #${id} block`;
    }
    update(id, updateBlockDto) {
        return `This action updates a #${id} block`;
    }
    remove(id) {
        return `This action removes a #${id} block`;
    }
};
BlockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(block_entity_1.BlockEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], BlockService);
exports.BlockService = BlockService;
//# sourceMappingURL=block.service.js.map