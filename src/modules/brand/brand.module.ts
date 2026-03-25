import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandRepository } from 'src/models'; // اتأكدي إن المسار صح
import { Brand, brandSchema } from 'src/models/brand/brand.schema'; // السكيما اللي عملناها

@Module({
  imports: [
    // 1. تسجيل السكيما جوه الموديول عشان الـ Repository يقدر يحقنها
    MongooseModule.forFeature([{ name: Brand.name, schema: brandSchema }])
  ],
  controllers: [BrandController],
  // 2. ضيفي الـ BrandRepository هنا في الـ providers
  providers: [BrandService, BrandRepository], 
  exports: [BrandService] 
})
export class BrandModule {}