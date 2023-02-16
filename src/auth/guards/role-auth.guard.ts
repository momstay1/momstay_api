import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AllowedRole } from "src/common/decorator/role.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    ctx: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<AllowedRole>(
      'roles',
      ctx.getHandler()
    );

    if (!requiredRoles) {
      return true;
    }

    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (requiredRoles.includes('Any')) return true;
    if (!user) return false;

    // 회원 그룹 및 권한 그룹 교집합 구하기
    const groups = user.group.split('|');
    const difference = groups.filter(x => requiredRoles.includes(x));
    console.log(user.group);
    console.log({ groups });
    console.log({ difference });
    // 길이 0 이상인 배열시 권한 있음
    return difference.length > 0;
  }
}