import { PlaceEntity } from "src/place/entities/place.entity";
import { UsersEntity } from "src/users/entities/user.entity";
export declare class DefectEntity {
    dft_idx: number;
    dft_place_idx: string;
    dft_sort1: string;
    dft_sort2: string;
    dft_sort3: string;
    dft_status: string;
    dft_type: string;
    dft_content: string;
    dft_work_method: string;
    dft_replacement_square_meter: string;
    dft_replacement_sheet: string;
    dft_shooting_day: string;
    dft_device_key: string;
    dft_createdAt: Date;
    dft_updatedAt: Date;
    place: PlaceEntity;
    user: UsersEntity;
}
