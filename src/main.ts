import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const express = require('express');

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('API docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // since we use vercel, we take care about styles
  const swaggerCss = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';
  const swaggerJs = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.js';
  const swaggerPreset = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.js';

  SwaggerModule.setup('api/docs', app, document, {
    customCssUrl: swaggerCss,
    customJs: [swaggerJs, swaggerPreset],
  });
  await app.init();

  if (process.env.NODE_ENV !== 'production') {
    await app.listen(process.env.PORT || 3000);
    console.log(`🚀 Local: http://localhost:3000/api`);
    console.log(`📖 Swagger: http://localhost:3000/api/docs`);
  }
}

bootstrap();

export default server;
