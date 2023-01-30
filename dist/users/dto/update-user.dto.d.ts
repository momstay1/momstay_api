import { CreateUserDto } from './create-user.dto';
export declare class UpdateUserDto extends CreateUserDto {
    readonly type: string;
    readonly status: number;
    readonly id: string;
    readonly password: string;
    readonly name: string;
    readonly uniqueKey: string;
    readonly certifiInfo: string;
    readonly marketing: string;
    readonly group: number[];
}
