import { SetMetadata } from "@nestjs/common";

export type AllowedRole = 'manufacturer' | 'genuio' | 'Any';

export const Role = (roles: AllowedRole[]) => SetMetadata('roles', roles);