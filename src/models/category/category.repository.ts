
import { Injectable } from "@nestjs/common";
import { Category } from "./category.schema";
import { AbstractRepository } from "../abstract.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CategoryRepository extends AbstractRepository<Category> {
    constructor(
        @InjectModel(Category.name)
        private readonly categoryModel: Model<Category>
    ) {
        super(categoryModel);
    }   
    
}