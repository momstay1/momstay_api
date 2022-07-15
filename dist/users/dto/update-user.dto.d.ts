import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    readonly status: string;
    readonly type: string;
    readonly password: string;
    readonly name: string;
    readonly phone: string;
    readonly memo: string;
    readonly group: string;
    readonly place_idx: string;
}
export {};
