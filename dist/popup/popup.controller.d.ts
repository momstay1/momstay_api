import { PopupService } from './popup.service';
import { PopupEntity } from './entities/popup.entity';
export declare class PopupController {
    private readonly popupService;
    constructor(popupService: PopupService);
    getPopup(id: string, page: string): Promise<{
        popup: PopupEntity[];
        file_info: {};
    }>;
}
