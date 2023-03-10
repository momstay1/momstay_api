import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceEntity } from './entities/device.entity';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
export declare class DeviceService {
    private deviceRepository;
    private readonly jwtService;
    constructor(deviceRepository: Repository<DeviceEntity>, jwtService: JwtService);
    create(createDeviceDto: CreateDeviceDto): Promise<{
        device: any;
    }>;
    findAll(): string;
    findOne(token: string): Promise<{
        device: DeviceEntity;
    }>;
    findOneToken(token: string): Promise<DeviceEntity>;
    findOneIdx(idx: number): Promise<DeviceEntity>;
    update(idx: number, updateDeviceDto: UpdateDeviceDto): Promise<{
        device: DeviceEntity;
    }>;
    updateUser(idx: number): Promise<{
        device: DeviceEntity;
    }>;
    remove(id: number): string;
    deivceCreateCode(): Promise<string>;
    createJwt(payload: any, options?: JwtSignOptions): Promise<string>;
}
