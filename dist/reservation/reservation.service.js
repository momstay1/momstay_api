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
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const file_service_1 = require("../file/file.service");
const paginate_1 = require("../paginate");
const product_option_service_1 = require("../product-option/product-option.service");
const push_notification_service_1 = require("../push-notification/push-notification.service");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const reservation_entity_1 = require("./entities/reservation.entity");
let ReservationService = class ReservationService {
    constructor(reservationRepository, productOptionService, usersService, fileService, pushNotiService) {
        this.reservationRepository = reservationRepository;
        this.productOptionService = productOptionService;
        this.usersService = usersService;
        this.fileService = fileService;
        this.pushNotiService = pushNotiService;
    }
    async create(userInfo, createReservationDto) {
        const po = await this.productOptionService.findIdx(createReservationDto.productOptionIdx);
        if (po.status != 2) {
            throw new common_1.NotAcceptableException('게시하지 않은 방입니다.');
        }
        if (po.stayStatus != '1') {
            throw new common_1.NotAcceptableException('해당 방은 공실 상태가 아닙니다.');
        }
        if (po.visitStatus != '2') {
            throw new common_1.NotAcceptableException('방문예약을 사용하지 않는 방입니다.');
        }
        const user = await this.usersService.findId(userInfo.id);
        if (user['group']['id'] == 'host' && user['idx'] == (0, lodash_1.get)(po, ['product', 'user', 'idx'], '')) {
            throw new common_1.NotAcceptableException('자신의 방은 예약할 수 없습니다.');
        }
        const reservation_data = {
            visitDate: createReservationDto.visitDate,
            visitTime: createReservationDto.visitTime,
            occupancyAt: createReservationDto.occupancyAt,
            evictionAt: createReservationDto.evictionAt,
            memo: createReservationDto.memo,
            productOption: po,
            user: user
        };
        const reservationEntity = await this.reservationRepository.create(reservation_data);
        const reservation = await this.reservationRepository.save(reservationEntity);
        const hostUser = (0, lodash_1.get)(po, ['product', 'user']);
        console.log(hostUser.device);
        if ((0, lodash_1.get)(hostUser, ['device', 'token'], '')) {
            await this.pushNotiService.guestReservationPush(hostUser, po);
        }
        return { reservation };
    }
    async hostFindAll(options, userInfo) {
        const { take, page } = options;
        const [results, total] = await this.reservationRepository.createQueryBuilder('reservation')
            .leftJoinAndSelect('reservation.productOption', 'productOption')
            .leftJoinAndSelect('productOption.product', 'product')
            .leftJoinAndSelect('product.user', 'user')
            .where((qb) => {
            qb.where('`reservation`.status IN (:status)', { status: [1, 2, 4, 5] });
            if (userInfo['group'] == 'host') {
                qb.andWhere('`user`.id = :user_id', { user_id: userInfo['id'] });
            }
        })
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        const product_option_idxs = (0, lodash_1.map)(results, o => o.productOption.idx);
        let file_info = {};
        try {
            file_info = await this.fileService.findCategoryForeignAll(['roomDetailImg'], product_option_idxs);
            file_info = common_utils_1.commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
        }
        catch (error) {
            console.log('방 리스트 이미지 파일 없음');
        }
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data, file_info };
    }
    async guestFindAll(options, userInfo) {
        const { take, page } = options;
        const [results, total] = await this.reservationRepository.createQueryBuilder('reservation')
            .leftJoinAndSelect('reservation.productOption', 'productOption')
            .leftJoinAndSelect('productOption.product', 'product')
            .leftJoinAndSelect('reservation.user', 'user')
            .where((qb) => {
            qb.where('`reservation`.status IN (:status)', { status: [1, 2, 4, 5] });
            if (['host', 'guest'].includes(userInfo['group'])) {
                qb.andWhere('`user`.id = :user_id', { user_id: userInfo['id'] });
            }
        })
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        const product_option_idxs = (0, lodash_1.map)(results, o => o.productOption.idx);
        let file_info = {};
        try {
            file_info = await this.fileService.findCategoryForeignAll(['roomDetailImg'], product_option_idxs);
            file_info = common_utils_1.commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
        }
        catch (error) {
            console.log('방 리스트 이미지 파일 없음');
        }
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data, file_info };
    }
    async findOne(idx) {
        const reservation = await this.findOneIdx(idx);
        let file_info = {};
        try {
            file_info = await this.fileService.findCategoryForeignAll(['roomDetailImg'], [reservation.productOption.idx]);
            file_info = common_utils_1.commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
        }
        catch (error) {
            console.log('방 리스트 이미지 파일 없음');
        }
        return { reservation, file_info };
    }
    async findOneIdx(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const reservation = await this.reservationRepository.findOne({
            where: { idx: idx },
            relations: [
                'productOption',
                'productOption.product',
                'productOption.product.user',
                'productOption.product.user.device',
                'user',
                'user.device'
            ]
        });
        if (!reservation.idx) {
            throw new common_1.NotFoundException('정보를 찾을 수 없습니다.');
        }
        return reservation;
    }
    async update(userInfo, idx) {
        const reservation = await this.findOneIdx(idx);
        await this.processCheckStatus(reservation.status);
        await this.authCheckStatus(userInfo, reservation.productOption.product.user.idx);
        await this.changeStatus(2, idx);
        const { user } = reservation;
        if ((0, lodash_1.get)(user, ['device', 'token'], '')) {
            await this.pushNotiService.hostReservationApprovalPush(user, reservation);
        }
    }
    async guestCancel(userInfo, idx) {
        const reservation = await this.findOneIdx(idx);
        await this.processCheckStatus(reservation.status);
        await this.authCheckStatus(userInfo, reservation.user.idx);
        await this.changeStatus(4, idx);
        const { user } = (0, lodash_1.get)(reservation, ['productOption', 'product']);
        if ((0, lodash_1.get)(user, ['device', 'token'], '')) {
            await this.pushNotiService.guestReservationCancelPush(user, reservation);
        }
    }
    async hostCancel(userInfo, idx) {
        const reservation = await this.findOneIdx(idx);
        await this.processCheckStatus(reservation.status);
        await this.authCheckStatus(userInfo, reservation.productOption.product.user.idx);
        await this.changeStatus(5, idx);
        const { user } = reservation;
        if ((0, lodash_1.get)(user, ['device', 'token'], '')) {
            await this.pushNotiService.hostReservationCancelPush(user, reservation);
        }
    }
    async processCheckStatus(status) {
        if (status != 1) {
            throw new common_1.NotAcceptableException('이미 처리된 방문예약입니다.');
        }
    }
    async authCheckStatus({ group, id }, idx) {
        if (!common_utils_1.commonUtils.isAdmin(group)) {
            const user = await this.usersService.findId(id);
            if (user.idx != idx) {
                throw new common_1.NotAcceptableException('거부할 수 없는 방문 예약 입니다.');
            }
        }
    }
    async changeStatus(status, idx) {
        await this.reservationRepository.createQueryBuilder()
            .update(reservation_entity_1.ReservationEntity)
            .set({ status: status })
            .where(" idx IN (:idx)", { idx: idx })
            .execute();
    }
};
ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.ReservationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        product_option_service_1.ProductOptionService,
        users_service_1.UsersService,
        file_service_1.FileService,
        push_notification_service_1.PushNotificationService])
], ReservationService);
exports.ReservationService = ReservationService;
//# sourceMappingURL=reservation.service.js.map