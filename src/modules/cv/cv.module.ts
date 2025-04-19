import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { AuthModule } from '../auth/auth.module';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cv]), AuthModule],
  providers: [CvService, FilesService],
  controllers: [CvController],
})
export class CvModule {}
