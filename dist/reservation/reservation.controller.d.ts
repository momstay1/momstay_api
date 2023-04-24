import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    create(user: UsersEntity, createReservationDto: CreateReservationDto): Promise<{
        reservation: import("./entities/reservation.entity").ReservationEntity;
    }>;
    hostFindAll(user: UsersEntity, take: number, page: number, order: string): Promise<{
        file_info: {};
        results: import("./entities/reservation.entity").ReservationEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    guestFindAll(user: UsersEntity, take: number, page: number, order: string): Promise<{
        file_info: {};
        results: import("./entities/reservation.entity").ReservationEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    findOne(idx: string): Promise<{
        reservation: import("./entities/reservation.entity").ReservationEntity;
        file_info: {};
    }>;
    guestConfirmation(user: UsersEntity, idx: string): Promise<void>;
    hostApproval(user: UsersEntity, idx: string): Promise<void>;
    update(user: UsersEntity, idx: string): Promise<void>;
    guestCancel(user: UsersEntity, idx: string): Promise<void>;
    hostCancel(user: UsersEntity, idx: string): Promise<void>;
}
