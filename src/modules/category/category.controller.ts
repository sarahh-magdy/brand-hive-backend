import { Controller, Post, Body, UseGuards, Put, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
// مسار نسبي كامل بدل @common/decorators
import { User } from '../../common/decorators/user.decorator';
import { CategoryFactoryService } from './factory';
// مسار نسبي كامل بدل @common/decorators/Auth
import { Auth } from '../../common/decorators/auth.decorator';
// مسار نسبي كامل بدل @common/guards
import { AuthGuard } from '../../common/guards/auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
@Auth(['Admin', 'Customer'])
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(    
    private readonly categoryService: CategoryService,  
    private readonly categoryFactoryService: CategoryFactoryService,
  ) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto, 
    @User() user: any
  ) {
    const category = this.categoryFactoryService.createCategory(createCategoryDto, user);
    const categoryCreated = await this.categoryService.create(category);
    return {
      success: true,
      message: 'Category created successfully',
      data: categoryCreated, 
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @User() user: any
  ){
    const category = await this.categoryFactoryService.updateCategory(id, updateCategoryDto, user);
    const updatedCategory = await this.categoryService.update(id, category);
    return {
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory, 
    };
  }
}