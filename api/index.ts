import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express, { Express } from 'express';

const server: Express = express();
let isInitialized = false;

/**
 * bootstrap
 * بيشغل NestJS مرة واحدة فقط
 */
async function bootstrap() {
  if (!isInitialized) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );

    app.enableCors();
    await app.init();
    isInitialized = true;

    console.log('✅ NestJS initialized');
  }
}

/**
 * handler
 * ده اللي Vercel هيشغله لكل request
 */
export default async function handler(req: any, res: any) {
  // اختبار سريع: root /api
  if (req.url === '/api' || req.url === '/api/') {
    return res.status(200).json({ message: "API file is loaded ✅" });
  }

  // أي route NestJS
  await bootstrap();
  return server(req, res);
}