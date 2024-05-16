import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LoggerService } from 'src/logger/logger.service';
import { UserService } from 'src/user/user.service';
import { DbService } from 'src/db/db.service';
import { config } from 'src/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LoggerService, UserService, DbService],
  imports: [
    JwtModule.register({
      secret: config.jwtSecret,
      signOptions: { expiresIn: config.jwtExpire },
    }),
  ],
})
export class AuthModule {}
