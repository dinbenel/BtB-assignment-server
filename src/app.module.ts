import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    LoggerModule,
    DbModule,
    UserModule,
  ],
})
export class AppModule {}
