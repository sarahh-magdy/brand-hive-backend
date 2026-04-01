// src/modules/category/category.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../models/category/category.repository';
import { Category } from './entities/category.entity';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(category: Category) {
    const categoryExist = await this.categoryRepository.getOne({ slug: category.slug });
    if (categoryExist) {
      throw new ConflictException('Category already exists');
    }
    return await this.categoryRepository.create({ ...category });
  }

  async update(id: string, category: Category) {
    const categoryExist = await this.categoryRepository.getOne({ 
      slug: category.slug,
      _id: { $ne: new Types.ObjectId(id) } 
    });
    if (categoryExist) {
      throw new ConflictException('Category already exists');
    }
    return await this.categoryRepository.updateOne(
      { _id: new Types.ObjectId(id) },
      category,
      { new: true }
    );
  }
}