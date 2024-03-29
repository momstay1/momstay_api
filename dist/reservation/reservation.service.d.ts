import { FileService } from 'src/file/file.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { ProductOptionService } from 'src/product-option/product-option.service';
import { PushNotificationService } from 'src/push-notification/push-notification.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationEntity } from './entities/reservation.entity';
import { ExcelService } from 'src/excel/excel.service';
import { EmailService } from 'src/email/email.service';
import { MessageService } from 'src/message/message.service';
import { SettingsService } from 'src/settings/settings.service';
export declare class ReservationService {
    private reservationRepository;
    private readonly productOptionService;
    private readonly usersService;
    private readonly fileService;
    private readonly pushNotiService;
    private readonly excelSerivce;
    private readonly emailService;
    private readonly messageService;
    private readonly settingsService;
    constructor(reservationRepository: Repository<ReservationEntity>, productOptionService: ProductOptionService, usersService: UsersService, fileService: FileService, pushNotiService: PushNotificationService, excelSerivce: ExcelService, emailService: EmailService, messageService: MessageService, settingsService: SettingsService);
    create(userInfo: any, createReservationDto: CreateReservationDto): Promise<{
        reservation: ReservationEntity;
    }>;
    hostFindAll(options: PaginationOptions, userInfo: any, order: string): Promise<{
        data: Pagination<ReservationEntity>;
        file_info: {};
    }>;
    guestFindAll(options: PaginationOptions, userInfo: any, order: string): Promise<{
        data: Pagination<ReservationEntity>;
        file_info: {};
    }>;
    findAll(userInfo: any, options: PaginationOptions, search: string[], order: string): Promise<{
        data: Pagination<ReservationEntity>;
        file_info: {};
    }>;
    findOne(idx: number): Promise<{
        reservation: ReservationEntity;
        file_info: {};
    }>;
    findOneIdx(idx: number): Promise<ReservationEntity>;
    findIdxs(idxs: number[]): Promise<Array<ReservationEntity>>;
    guestConfirmation(userInfo: any, idx: number): Promise<void>;
    hostApproval(userInfo: any, idx: number): Promise<void>;
    update(userInfo: any, idx: number): Promise<void>;
    guestCancel(userInfo: any, idx: number): Promise<void>;
    hostCancel(userInfo: any, idx: number): Promise<void>;
    settingsAlimtalkData(reservation: any, guset_user: any): Promise<{
        product_title: any;
        po_title: any;
        occupancy_date: any;
        eviction_date: any;
        visit_date: string;
        contract_period: number;
        link: string;
        guest_link: any;
        host_link: any;
        guest_name: any;
        phone: any;
    }>;
    processCheckStatus(status: any): Promise<void>;
    authCheckStatus({ group, id }: {
        group: any;
        id: any;
    }, idx: any): Promise<void>;
    changeStatus(status: number, idx: number | number[]): Promise<void>;
    adminChangeStatus(status: number, idxs: number[]): Promise<void>;
    dashboard(month: string): Promise<any>;
    createExcel(userInfo: any, options: PaginationOptions, search: string[], order: string): Promise<{
        file_name: string;
        file_path: string;
    }>;
}
