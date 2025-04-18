import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cv])],
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'cv', method: RequestMethod.ALL });
  }
}