/*// commands/index.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UserSeeder } from './seeders/user.seeder';
import { SkillSeeder } from './seeders/skill.seeder';
import { CvSeeder } from './seeders/cv.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  await new UserSeeder().run(app);
  await new SkillSeeder().run(app);
  await new CvSeeder().run(app);

  await app.close();
}

bootstrap();
*/
