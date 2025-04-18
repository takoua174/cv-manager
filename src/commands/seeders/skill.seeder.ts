import { randProgrammingLanguage } from '@ngneat/falso';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { SkillService } from '../../modules/skill/skill.service';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const skillService = app.get(SkillService);
  for (let i = 0; i < 20; i++) {
    await skillService.create({
      designation: randProgrammingLanguage(),
    });
  }

  console.log('Database seeded successfully!');
  await app.close();
}

bootstrap();
