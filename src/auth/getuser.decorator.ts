import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UsersEntity } from "src/users/entities/user.entity";

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UsersEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
)