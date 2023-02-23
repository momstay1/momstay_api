import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    create(user: UsersEntity, createReservationDto: CreateReservationDto): Promise<{
        reservation: import("./entities/reservation.entity").ReservationEntity;
    }>;
    hostFindAll(user: UsersEntity, take: number, page: number): Promise<{
        results: import("./entities/reservation.entity").ReservationEntity[];
        total: number;
        pageTotal: number;
        file_info: {};
    }>;
    guestFindAll(user: UsersEntity, take: number, page: number): Promise<{
        results: import("./entities/reservation.entity").ReservationEntity[];
        total: number;
        pageTotal: number;
        file_info: {};
    }>;
    findOne(idx: string): Promise<{
        reservation: import("./entities/reservation.entity").ReservationEntity;
        file_info: {};
    }>;
    update(user: UsersEntity, idx: string): Promise<void>;
    guestCancel(user: UsersEntity, idx: string): Promise<void>;
    hostCancel(user: UsersEntity, idx: string): Promise<void>;
}
