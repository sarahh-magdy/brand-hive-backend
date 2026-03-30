import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryFactoryService } from './factory';
import { CategoryRepository } from '../../models/category/category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModule } from '@shared/modules/user-mongo.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Category, CategorySchema } from '../../models/category/category.schema';


@Module({
  imports: [UserMongoModule, MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]), JwtModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, CategoryFactoryService , JwtService],
})
export class CategoryModule {}
