// src/commands/cv.seeder.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { CvService } from '../../modules/cv/cv.service';
import {
  randFirstName,
  randLastName,
  randJobTitle,
  randNumber,
} from '@ngneat/falso';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cvService = app.get(CvService);
  for (let i = 0; i < 20; i++) {
    await cvService.create({
      name: randLastName(),
      firstname: randFirstName(),
      age: randNumber({ min: 20, max: 60 }),
      cin: randNumber({ min: 10000000, max: 99999999 }),
      job: randJobTitle(),
    });
  }

  console.log('Database seeded successfully!');
  await app.close();
}

bootstrap();
