import {
  randFullName,
  randEmail,
  randPassword,
  randUserName,
} from '@ngneat/falso';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UserService } from '../../modules/user/user.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  for (let i = 0; i < 20; i++) {
    await userService.create({
      username: randUserName(),
      email: randEmail(),
      password: randPassword(),
    });
  }

  console.log('User database seeded successfully!');
  await app.close();
}

bootstrap();
