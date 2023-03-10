import { CreateOrderDto } from './create-order.dto';
declare const UpdateOrderDto_base: import("@nestjs/common").Type<Partial<CreateOrderDto>>;
export declare class UpdateOrderDto extends UpdateOrderDto_base {
    readonly adminMemo: string;
    readonly productOptionIdx: string;
    readonly cancelReason: string;
}
export {};
