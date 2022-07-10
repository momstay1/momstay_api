export declare type AllowedRole = 'root' | 'admin' | 'basic' | 'Any';
export declare const Role: (roles: AllowedRole[]) => import("@nestjs/common").CustomDecorator<string>;
export declare function Auth(roles: AllowedRole[]): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
