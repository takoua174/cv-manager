import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './modules/cv/cv.module';
import { UserModule } from './modules/user/user.module';
import { SkillModule } from './modules/skill/skill.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...AppDataSource.options,
      }),
    }),
    CvModule,
    UserModule,
    SkillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
