// src/modules/brand/brand.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandRepository } from '../../models/brand/brand.repository';
import { Brand, brandSchema } from '../../models/brand/brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: brandSchema }])
  ],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
  exports: [BrandService]
})
export class BrandModule {}