import { ConflictException, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/models/category/category.repository';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async create(category: Category) {
    const categoryExist = await this.categoryRepository.getOne({slug: category.slug});
    if (categoryExist) {
      throw new ConflictException('Category already exists');
    }
    return await this.categoryRepository.create(category);
  }
//UPDATE CATEGORY SERVICE
  update(id:string , categor: Category ){
     
  }
}
