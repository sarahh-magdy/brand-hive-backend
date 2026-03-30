import { SchemaTypes, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Category {
    @Prop({ type: Types.ObjectId })
    readonly _id: Types.ObjectId;
    
    @Prop({ type: String, required: true , unique: true , trim: true })
    name: string;
    
    @Prop({ type: String, required: true , unique: true , trim: true })
    slug: string;
    
    @Prop({ type: SchemaTypes.ObjectId, required: true , ref: 'Admin' })
    createdBy: Types.ObjectId;
     
    @Prop({ type: SchemaTypes.ObjectId, required: true , ref: 'User' })
    updatedBy: Types.ObjectId;
    //TODO: add logo field
    @Prop({ type: Object })
    logo: object;
}
 export const CategorySchema = SchemaFactory.createForClass(Category);