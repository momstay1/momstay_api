import { ReservationService } from './reservation.service';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class AdminReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    findAll(user: UsersEntity, take: number, page: number, search: string[], order: string): Promise<{
        file_info: {};
        results: import("./entities/reservation.entity").ReservationEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    adminStatusChange(status: string, idxs: number[]): Promise<void>;
    excelDownload(user: UsersEntity, take: number, page: number, search: string[], order: string, res: any): Promise<void>;
}
