import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RoleGuard } from "src/auth/guards/role-auth.guard";

export type AllowedRole = 'root' | 'admin' | 'host' | 'guest' | 'Any';

export const Role = (roles: AllowedRole[]) => SetMetadata('roles', roles);

export function Auth(roles: AllowedRole[]) {
  return applyDecorators(
    Role(roles),
    UseGuards(JwtAuthGuard),
    UseGuards(RoleGuard),
  );
}