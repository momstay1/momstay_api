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
const excel_service_1 = require("../excel/excel.service");
const email_service_1 = require("../email/email.service");
const readyStatus = 1;
const approvalStatus = 2;
const confirmationStatus = 3;
const cancelStatus = 4;
const refusalStatus = 5;
const status = [
    readyStatus,
    approvalStatus,
    confirmationStatus,
    cancelStatus,
    refusalStatus,
];
let ReservationService = class ReservationService {
    constructor(reservationRepository, productOptionService, usersService, fileService, pushNotiService, excelSerivce, emailService) {
        this.reservationRepository = reservationRepository;
        this.productOptionService = productOptionService;
        this.usersService = usersService;
        this.fileService = fileService;
        this.pushNotiService = pushNotiService;
        this.excelSerivce = excelSerivce;
        this.emailService = emailService;
    }
    async create(userInfo, createReservationDto) {
        const po = await this.productOptionService.findIdx(createReservationDto.productOptionIdx);
        if (po.status != 2) {
            throw new common_1.NotAcceptableException('게시하지 않은 방입니다.');
        }
        if (po.visitStatus != '2') {
            throw new common_1.NotAcceptableException('방문예약을 사용하지 않는 방입니다.');
        }
        const user = await this.usersService.findId(userInfo.id);
        if (user['group']['id'] == 'host' &&
            user['idx'] == (0, lodash_1.get)(po, ['product', 'user', 'idx'], '')) {
            throw new common_1.NotAcceptableException('자신의 방은 예약할 수 없습니다.');
        }
        const reservation_data = {
            visitDate: createReservationDto.visitDate,
            visitTime: createReservationDto.visitTime,
            occupancyAt: createReservationDto.occupancyAt,
            evictionAt: createReservationDto.evictionAt,
            memo: createReservationDto.memo,
            productOption: po,
            user: user,
        };
        const reservationEntity = await this.reservationRepository.create(reservation_data);
        const reservation = await this.reservationRepository.save(reservationEntity);
        const hostUser = (0, lodash_1.get)(po, ['product', 'user']);
        console.log(hostUser.device);
        if ((0, lodash_1.get)(hostUser, ['device', 'token'], '')) {
            await this.pushNotiService.guestReservationPush(hostUser, po);
        }
        const { mail, email_tmpl } = await this.emailService.mailSettings({ type: 'reservation', group: 'host', code: 'request', lang: 'ko' }, {
            po_title: po.title,
            product_title: po.product.title,
            guest_name: user.name,
            occupancy_date: reservation.occupancyAt,
            eviction_date: reservation.evictionAt,
            visit_date: reservation.visitDate + ' ' + reservation.visitTime,
            phone: user.countryCode + ' ' + user.phone
        });
        if (mail != '' && email_tmpl != '') {
            await this.emailService.sendMail(hostUser.email, mail.title, email_tmpl);
        }
        return { reservation };
    }
    async hostFindAll(options, userInfo) {
        const { take, page } = options;
        const [results, total] = await this.reservationRepository
            .createQueryBuilder('reservation')
            .leftJoinAndSelect('reservation.productOption', 'productOption')
            .leftJoinAndSelect('productOption.product', 'product')
            .leftJoinAndSelect('product.user', 'user')
            .where((qb) => {
            qb.where('`reservation`.status IN (:status)', { status: status });
            if (userInfo['group'] == 'host') {
                qb.andWhere('`user`.id = :user_id', { user_id: userInfo['id'] });
            }
        })
            .skip(take * (page - 1) || 0)
            .take(take || 10)
            .getManyAndCount();
        const product_option_idxs = (0, lodash_1.map)(results, (o) => o.productOption.idx);
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
        const [results, total] = await this.reservationRepository
            .createQueryBuilder('reservation')
            .leftJoinAndSelect('reservation.productOption', 'productOption')
            .leftJoinAndSelect('productOption.product', 'product')
            .leftJoinAndSelect('reservation.user', 'user')
            .where((qb) => {
            qb.where('`reservation`.status IN (:status)', { status: status });
            if (['host', 'guest'].includes(userInfo['group'])) {
                qb.andWhere('`user`.id = :user_id', { user_id: userInfo['id'] });
            }
        })
            .skip(take * (page - 1) || 0)
            .take(take || 10)
            .getManyAndCount();
        const product_option_idxs = (0, lodash_1.map)(results, (o) => o.productOption.idx);
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
    async findAll(userInfo, options, search, order) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        where['status'] = (0, lodash_1.get)(where, 'status', status);
        const alias = 'reservation';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        const [results, total] = await this.reservationRepository
            .createQueryBuilder('reservation')
            .leftJoinAndSelect('reservation.user', 'guestUser')
            .leftJoinAndSelect('reservation.productOption', 'productOption')
            .leftJoinAndSelect('productOption.product', 'product')
            .leftJoinAndSelect('product.user', 'hostUser')
            .where((qb) => {
            qb.where('`reservation`.status IN (:status)', { status: (0, lodash_1.isArray)(where['status']) ? where['status'] : [where['status']] });
            (0, lodash_1.get)(where, 'po_title', '') && qb.andWhere('`productOption`.title LIKE :po_title', { po_title: '%' + where['po_title'] + '%' });
            (0, lodash_1.get)(where, 'name', '') && qb.andWhere('`guestUser`.name LIKE :name', { name: '%' + where['name'] + '%' });
            (0, lodash_1.get)(where, 'email', '') && qb.andWhere('`guestUser`.email LIKE :email', { email: '%' + where['email'] + '%' });
            (0, lodash_1.get)(where, 'id', '') && qb.andWhere('`guestUser`.id LIKE :id', { id: '%' + where['id'] + '%' });
            (0, lodash_1.get)(where, 'min_visit_date', '') && qb.andWhere('`reservation`.visitDate >= :min_visit_date', { min_visit_date: where['min_visit_date'] });
            (0, lodash_1.get)(where, 'max_visit_date', '') && qb.andWhere('`reservation`.visitDate <= :max_visit_date', { max_visit_date: where['max_visit_date'] });
        })
            .orderBy(order_by)
            .skip(take * (page - 1) || 0)
            .take(take || 10)
            .getManyAndCount();
        const product_option_idxs = (0, lodash_1.map)(results, (o) => o.productOption.idx);
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
        let po_file = [];
        let product_file = [];
        try {
            po_file = await this.fileService.findCategoryForeignAll(['roomDetailImg'], [reservation.productOption.idx]);
        }
        catch (error) {
            console.log('방 리스트 이미지 파일 없음');
        }
        try {
            product_file = await this.fileService.findCategoryForeignAll(['lodgingDetailImg', 'mealsImg'], [reservation.productOption.product.idx]);
        }
        catch (error) {
            console.log('숙소 리스트 이미지 파일 없음');
        }
        file_info = common_utils_1.commonUtils.getArrayKey([...po_file, ...product_file], ['file_foreign_idx', 'file_category'], true);
        return { reservation, file_info };
    }
    async findOneIdx(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('reservation.service.findOneIdx: 잘못된 정보 입니다.');
        }
        const reservation = await this.reservationRepository.findOne({
            where: { idx: idx },
            relations: [
                'productOption',
                'productOption.product',
                'productOption.product.user',
                'productOption.product.user.device',
                'user',
                'user.device',
            ],
        });
        if (!reservation.idx) {
            throw new common_1.NotFoundException('reservation.service.findOneIdx: 정보를 찾을 수 없습니다.');
        }
        return reservation;
    }
    async findIdxs(idxs) {
        if (idxs.length <= 0) {
            throw new common_1.NotFoundException('reservation.service.findIdxs: 잘못된 정보 입니다.');
        }
        const reservation = await this.reservationRepository.find({
            where: { idx: (0, typeorm_2.In)(idxs) },
            relations: [
                'productOption',
                'productOption.product',
                'productOption.product.user',
                'productOption.product.user.device',
                'user',
                'user.device',
            ],
        });
        if (reservation.length <= 0) {
            throw new common_1.NotFoundException('reservation.service.findIdxs: 정보를 찾을 수 없습니다.');
        }
        return reservation;
    }
    async guestConfirmation(userInfo, idx) {
        const reservation = await this.findOneIdx(idx);
        await this.authCheckStatus(userInfo, reservation.user.idx);
        await this.changeStatus(confirmationStatus, idx);
        const { user } = (0, lodash_1.get)(reservation, ['productOption', 'product']);
        if ((0, lodash_1.get)(user, ['device', 'token'], '')) {
            await this.pushNotiService.guestReservationConfirmationPush(user, reservation);
        }
        const { mail, email_tmpl } = await this.emailService.mailSettings({ type: 'reservation', group: 'host', code: 'guest_complete', lang: 'ko' }, {
            po_title: reservation.productOption.title,
            product_title: reservation.productOption.product.title,
            visit_date: reservation.visitDate + ' ' + reservation.visitTime,
            guest_name: user.name,
            occupancy_date: reservation.occupancyAt,
            eviction_date: reservation.evictionAt,
            phone: user.countryCode + ' ' + user.phone
        });
        if (mail != '' && email_tmpl != '') {
            await this.emailService.sendMail(reservation.productOption.product.user.email, mail.title, email_tmpl);
        }
    }
    async hostApproval(userInfo, idx) {
        const reservation = await this.findOneIdx(idx);
        await this.processCheckStatus(reservation.status);
        await this.authCheckStatus(userInfo, reservation.productOption.product.user.idx);
        await this.changeStatus(approvalStatus, idx);
        const { user } = reservation;
        if ((0, lodash_1.get)(user, ['device', 'token'], '')) {
            await this.pushNotiService.hostReservationApprovalPush(user, reservation);
        }
        const lang = common_utils_1.commonUtils.langValue(reservation.user.language == 'ko' ? reservation.user.language : 'en');
        const { mail, email_tmpl } = await this.emailService.mailSettings({ type: 'reservation', group: 'guest', code: 'host_complete', lang: reservation.user.language }, {
            po_title: reservation.productOption['title' + lang],
            product_title: reservation.productOption.product['title' + lang],
            visit_date: reservation.visitDate + ' ' + reservation.visitTime,
            guest_name: user.name,
            occupancy_date: reservation.occupancyAt,
            eviction_date: reservation.evictionAt,
            phone: user.countryCode + ' ' + user.phone
        });
        if (mail != '' && email_tmpl != '') {
            await this.emailService.sendMail(reservation.user.email, mail.title, email_tmpl);
        }
    }
    async update(userInfo, idx) {
        const reservation = await this.findOneIdx(idx);
        await this.processCheckStatus(reservation.status);
        await this.authCheckStatus(userInfo, reservation.productOption.product.user.idx);
        await this.changeStatus(approvalStatus, idx);
        const { user } = reservation;
        if ((0, lodash_1.get)(user, ['device', 'token'], '')) {
            await this.pushNotiService.hostReservationApprovalPush(user, reservation);
        }
    }
    async guestCancel(userInfo, idx) {
        const reservation = await this.findOneIdx(idx);
        await this.processCheckStatus(reservation.status);
        await this.authCheckStatus(userInfo, reservation.user.idx);
        await this.changeStatus(cancelStatus, idx);
        const { user } = (0, lodash_1.get)(reservation, ['productOption', 'product']);
        if ((0, lodash_1.get)(user, ['device', 'token'], '')) {
            await this.pushNotiService.guestReservationCancelPush(user, reservation);
        }
        const { mail, email_tmpl } = await this.emailService.mailSettings({ type: 'reservation', group: 'host', code: 'guest_cancel', lang: 'ko' }, {
            po_title: reservation.productOption.title,
            product_title: reservation.productOption.product.title,
            visit_date: reservation.visitDate + ' ' + reservation.visitTime,
            guest_name: user.name,
            occupancy_date: reservation.occupancyAt,
            eviction_date: reservation.evictionAt,
            phone: user.countryCode + ' ' + user.phone
        });
        if (mail != '' && email_tmpl != '') {
            await this.emailService.sendMail(reservation.productOption.product.user.email, mail.title, email_tmpl);
        }
    }
    async hostCancel(userInfo, idx) {
        const reservation = await this.findOneIdx(idx);
        await this.processCheckStatus(reservation.status);
        await this.authCheckStatus(userInfo, reservation.productOption.product.user.idx);
        await this.changeStatus(refusalStatus, idx);
        const { user } = reservation;
        if ((0, lodash_1.get)(user, ['device', 'token'], '')) {
            await this.pushNotiService.hostReservationCancelPush(user, reservation);
        }
        const lang = common_utils_1.commonUtils.langValue(reservation.user.language == 'ko' ? reservation.user.language : 'en');
        const { mail, email_tmpl } = await this.emailService.mailSettings({ type: 'reservation', group: 'guest', code: 'host_cancel', lang: reservation.user.language }, {
            po_title: reservation.productOption['title' + lang],
            product_title: reservation.productOption.product['title' + lang],
            visit_date: reservation.visitDate + ' ' + reservation.visitTime,
            guest_name: user.name,
            occupancy_date: reservation.occupancyAt,
            eviction_date: reservation.evictionAt,
            phone: user.countryCode + ' ' + user.phone
        });
        if (mail != '' && email_tmpl != '') {
            await this.emailService.sendMail(reservation.user.email, mail.title, email_tmpl);
        }
    }
    async processCheckStatus(status) {
        if (status != readyStatus) {
            throw new common_1.NotAcceptableException('reservation.service.processCheckStatus: 이미 처리된 방문예약입니다.');
        }
    }
    async authCheckStatus({ group, id }, idx) {
        if (!common_utils_1.commonUtils.isAdmin(group)) {
            const user = await this.usersService.findId(id);
            if (user.idx != idx) {
                throw new common_1.NotAcceptableException('reservation.service.authCheckStatus: 거부할 수 없는 방문 예약 입니다.');
            }
        }
    }
    async changeStatus(status, idx) {
        await this.reservationRepository
            .createQueryBuilder()
            .update(reservation_entity_1.ReservationEntity)
            .set({ status: status })
            .where(' idx IN (:idx)', { idx: idx })
            .execute();
    }
    async adminChangeStatus(status, idxs) {
        const reservations = await this.findIdxs(idxs);
        await this.changeStatus(status, idxs);
        for (const key in reservations) {
            const guestUser = reservations[key].user;
            const hostUser = reservations[key].productOption.product.user;
            await this.pushNotiService.adminReservationStatusChange(guestUser, hostUser, reservations[key]);
            await this.pushNotiService.adminReservationStatusChange(guestUser, hostUser, reservations[key]);
        }
    }
    async dashboard(month) {
        const reservation_cnt = await this.reservationRepository
            .createQueryBuilder()
            .select('COUNT(`idx`)', 'total_cnt')
            .where((qb) => {
            qb.where('DATE_FORMAT(`createdAt`, "%Y-%m") = :month', {
                month: month,
            });
        })
            .execute();
        return reservation_cnt;
    }
    async createExcel(userInfo, options, search, order) {
        const reservation = await this.findAll(userInfo, options, search, order);
        if (!reservation) {
            throw new common_1.NotFoundException('reservation.service.excel: 다운로드할 데이터가 없습니다.');
        }
        return this.excelSerivce.createExcel(reservation['data'], {
            type: 'reservation',
        });
    }
};
ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.ReservationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        product_option_service_1.ProductOptionService,
        users_service_1.UsersService,
        file_service_1.FileService,
        push_notification_service_1.PushNotificationService,
        excel_service_1.ExcelService,
        email_service_1.EmailService])
], ReservationService);
exports.ReservationService = ReservationService;
//# sourceMappingURL=reservation.service.js.map