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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const group_entity_1 = require("./entities/group.entity");
let GroupsService = class GroupsService {
    constructor(groupsRepository) {
        this.groupsRepository = groupsRepository;
    }
    create(createGroupDto) {
        return 'This action adds a new group';
    }
    async findAll() {
        return await this.groupsRepository.find();
    }
    async findAllUser(user) {
        const grp = await this.findOneName(user.user_group);
        return await this.groupsRepository.createQueryBuilder()
            .select()
            .where("grp_idx >= :grp_idx", { grp_idx: grp.idx })
            .getMany();
    }
    async findOne(idx) {
        const group = await this.groupsRepository.findOne(idx);
        if (!group) {
            throw new common_1.NotFoundException('존재하지 않는 그룹 입니다.');
        }
        return group;
    }
    async findIdxs(idxs) {
        const groups = await this.groupsRepository.find({
            where: { idx: (0, typeorm_2.In)(idxs) }
        });
        if (!groups) {
            throw new common_1.NotFoundException('존재하지 않는 그룹 입니다.');
        }
        return groups;
    }
    async findOneName(name) {
        const group = await this.groupsRepository.findOne({ id: name });
        if (!group) {
            throw new common_1.NotFoundException('존재하지 않는 그룹 입니다.');
        }
        return group;
    }
    update(id, updateGroupDto) {
        return `This action updates a #${id} group`;
    }
    remove(id) {
        return `This action removes a #${id} group`;
    }
};
GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(group_entity_1.GroupsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GroupsService);
exports.GroupsService = GroupsService;
//# sourceMappingURL=groups.service.js.map