import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { Logger, PinoLogger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('CV Manager API')
    .setDescription('API documentation for CV Manager application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('cv-manager')
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);
  const globalPrefix = 'api';
  app.use(
    `/${globalPrefix}/docs`,
    apiReference({
      content: document,
      title: 'Evostock API Reference',
      theme: 'default',
    }),
  );

  // Setup Swagger UI
  SwaggerModule.setup('api', app, document);

  const apiUrl = 'http://localhost:3000';

  const pino = await app.resolve(PinoLogger);
  pino.info(`🚀 Application is running on: ${apiUrl}/${globalPrefix}`);
  pino.info(`🚀 API Reference is running on: ${apiUrl}/${globalPrefix}/docs`);

  await app.listen(3000);
}
bootstrap();
