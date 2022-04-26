import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CommonService } from 'src/common/common.service';
import { GroupsModule } from 'src/groups/groups.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    // 서로 참조하는 경우 순환참조라고 하며, Call Back과 같은 문제가 발생할 수 있음. 
    // forwardRef()를 사용하여 서로 imports 해준다
    forwardRef(() => UsersModule),
    PassportModule,
    GroupsModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expried_on },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, CommonService],
  // imports만으로는 해당 서비스 사용이 불가능하며 exports를 해야 사용 가능
  exports: [AuthService],
})
export class AuthModule { }
