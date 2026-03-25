import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { User } from '@common/decorators/user.decorator';
import { CategoryFactoryService } from './factory';
import { Auth } from '@common/decorators';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
@Auth(['Admin'])
export class CategoryController {
  constructor(    
    private readonly categoryService: CategoryService,
    private readonly categoryFactory: CategoryFactoryService,
  
  ) {}

  @Post()
  // @UseGuards(AuthGuard)
  async create(
    @Body() createCategoryDto: CreateCategoryDto, 
    @User() user: any
  ) {
    const category = this.categoryFactory.createCategory(createCategoryDto, user);
    return {
      success: true,
      message: 'Category created successfully',
      data: category,
    };
  }

  @Put(':id')
  update(
    @Param('id') id:string,
    @Body() updateCategorydto : UpdateCategoryDto
  ){
    // this.
  }



}