import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('CV Manager API')
    .setDescription('API documentation for CV Manager application')
    .setVersion('1.0')
    .addTag('cv-manager')
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
