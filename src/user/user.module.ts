import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbService } from 'src/db/db.service';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DbService, LoggerService],
})
export class UserModule {}
