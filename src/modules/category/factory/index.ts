import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Category } from "../entities/category.entity";
import  slugify  from "slugify";

@Injectable()
export class CategoryFactoryService {
    createCategory(createCategoryDto: CreateCategoryDto, user: any) {
         if (!user) {
            throw new Error("User context is missing in CategoryFactory");
        }

        const category = new Category();
        category.name = createCategoryDto.name;
        category.slug = slugify(createCategoryDto.name, {
            lower: true,
            trim: true,
            replacement: '-',
        });
        category.logo = { url: createCategoryDto.logo };
        category.createdBy = user._id;  
        
        return category;
    }
}