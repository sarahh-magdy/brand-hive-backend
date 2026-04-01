import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express, { Express } from 'express';

const server: Express = express();
let isInitialized = false;

/**
 * bootstrap
 * ده اللي بيشغل NestJS مرة واحدة بس
 */
async function bootstrap() {
  if (!isInitialized) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );

    app.enableCors(); // لو عايزة CORS
    await app.init();

    isInitialized = true;
    console.log('✅ NestJS initialized');
  }
}

export default async function handler(req: any, res: any) {
  if (req.url === '/api' || req.url === '/api/') {
    return res.status(200).json({ message: "API file is loaded ✅" });
  }

  // لو مش root، شغلي NestJS
  await bootstrap();
  return server(req, res);
}
