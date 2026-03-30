import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module'; 
import express, { Express } from 'express';

const server: Express = express();

export const createServer = async (expressInstance: Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors(); 
  await app.init();
};

// Vercel Entry Point
export default async (req: any, res: any) => {
  await createServer(server);
  server(req, res);
};