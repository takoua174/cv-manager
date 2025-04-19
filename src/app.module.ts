import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './modules/cv/cv.module';
import { UserModule } from './modules/user/user.module';
import { SkillModule } from './modules/skill/skill.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...AppDataSource.options,
      }),
    }),
    CvModule,
    UserModule,
    SkillModule,
    AuthModule,
    LoggerModule.forRoot({
      pinoHttp: {
        // Optional: Pino config
        transport: {
          target: 'pino-pretty', // Optional: makes logs readable
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
