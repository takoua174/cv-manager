import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtConfig } from '../../config/database.config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    
    JwtModule.register({
        secret: JwtConfig.secret,
        signOptions: {
          expiresIn: JwtConfig.expiresIn,
        },
      }),
    UserModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}