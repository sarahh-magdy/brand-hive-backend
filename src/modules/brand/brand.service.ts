import { Injectable, NotFoundException } from '@nestjs/common';
import { BrandRepository } from '../../models';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async create(createBrandDto: CreateBrandDto) {
    return await this.brandRepository.create(createBrandDto as any);
  }

  async findAll() {
    return await this.brandRepository.getAll();
  }

async findOne(id: string) { // غيري النوع لـ string
    const brand = await this.brandRepository.getOne({ _id: id }); // استخدمي _id
    if (!brand) throw new NotFoundException(`Brand #${id} not found`);
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    return await this.brandRepository.update({ _id: id }, updateBrandDto as any);
  }

  async remove(id: string) {
    const result = await this.brandRepository.delete({ _id: id });
    if (!result) throw new NotFoundException(`Brand #${id} not found`);
    return { message: 'Brand deleted successfully' };
  }
}