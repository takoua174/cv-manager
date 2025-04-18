import {
  randFullName,
  randJobTitle,
  randNumber,
  randFilePath,
} from '@ngneat/falso';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { CvService } from '../../modules/cv/cv.service';
import { UserService } from '../../modules/user/user.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cvService = app.get(CvService);
  const userService = app.get(UserService);

  // Fetch existing users to link CVs
  const users = await userService.findAll();
  if (users.length === 0) {
    console.log('No users found. Please seed users first.');
    await app.close();
    return;
  }

  for (let i = 0; i < 20; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const fullName = randFullName();
    await cvService.createWithUser(
      {
        name: fullName.split(' ')[0],
        firstname: fullName.split(' ')[1] || fullName.split(' ')[0],
        age: randNumber({ min: 18, max: 60 }),
        cin: randNumber({ min: 10000000, max: 99999999 }),
        job: randJobTitle(),
        path: randFilePath(),
      },
      { userId: user.id }
    );
  }

  console.log('CV database seeded successfully!');
  await app.close();
}

bootstrap();