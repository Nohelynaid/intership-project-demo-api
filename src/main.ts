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
  const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
  SwaggerModule.setup('api/docs', app, document, {
    customCssUrl: CSS_URL,
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
