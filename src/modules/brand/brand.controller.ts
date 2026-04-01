// src/modules/brand/brand.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

// استخدام المسار الكامل بدل @common/decorators
import { Public, Roles } from '../../common/decorators';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Public()
  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Roles(['admin', 'seller']) 
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Patch(':id')
  @Roles(['admin', 'seller'])
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Roles(['admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}