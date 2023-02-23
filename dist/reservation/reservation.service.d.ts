import { FileService } from 'src/file/file.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { ProductOptionService } from 'src/product-option/product-option.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationEntity } from './entities/reservation.entity';
export declare class ReservationService {
    private reservationRepository;
    private readonly productOptionService;
    private readonly usersService;
    private readonly fileService;
    constructor(reservationRepository: Repository<ReservationEntity>, productOptionService: ProductOptionService, usersService: UsersService, fileService: FileService);
    create(userInfo: any, createReservationDto: CreateReservationDto): Promise<{
        reservation: ReservationEntity;
    }>;
    hostFindAll(options: PaginationOptions, userInfo: any): Promise<{
        data: Pagination<ReservationEntity>;
        file_info: {};
    }>;
    guestFindAll(options: PaginationOptions, userInfo: any): Promise<{
        data: Pagination<ReservationEntity>;
        file_info: {};
    }>;
    findOne(idx: number): Promise<{
        reservation: ReservationEntity;
        file_info: {};
    }>;
    findOneIdx(idx: number): Promise<ReservationEntity>;
    update(userInfo: any, idx: number): Promise<void>;
    guestCancel(userInfo: any, idx: number): Promise<void>;
    hostCancel(userInfo: any, idx: number): Promise<void>;
    processCheckStatus(status: any): Promise<void>;
    authCheckStatus({ group, id }: {
        group: any;
        id: any;
    }, idx: any): Promise<void>;
    changeStatus(status: number, idx: number): Promise<void>;
}
