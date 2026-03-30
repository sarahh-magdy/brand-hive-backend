import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
    
    // TODO: Add validation for logo
    @IsOptional()
    logo: object;
}
