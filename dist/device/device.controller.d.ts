import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    create(createDeviceDto: CreateDeviceDto): Promise<{
        device: any;
    }>;
    findAll(): string;
    findOne(token: string): Promise<{
        device: import("./entities/device.entity").DeviceEntity;
    }>;
    update(idx: string, updateDeviceDto: UpdateDeviceDto): Promise<{
        device: import("./entities/device.entity").DeviceEntity;
    }>;
    remove(id: string): string;
}
