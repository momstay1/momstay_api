import { UsersEntity } from "src/users/entities/user.entity";
export declare class DeviceEntity {
    idx: number;
    token: string;
    appVersion: string;
    os: string;
    osVersion: string;
    environment: string;
    marketing: string;
    service: string;
    marketingAt: Date | string;
    serviceAt: Date | string;
    createdAt: Date;
    updatedAt: Date;
    user: UsersEntity | undefined;
}
