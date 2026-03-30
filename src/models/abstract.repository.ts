import { Model, ProjectionType, QueryFilter, QueryOptions, UpdateQuery } from "mongoose";

export class AbstractRepository<T> {
    constructor(private readonly model: Model<T>) {}

    public async create(item: Partial<T>) {
        const doc = new this.model(item);
        return doc.save();
    }

    public async getOne(filter: QueryFilter<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>){
        return this.model.findOne(filter, projection, options);
    }

       public async updateOne(filter: QueryFilter<T>, UpdateQuery?: UpdateQuery<T>, options?: QueryOptions<T>){
        return this.model.findOneAndUpdate(filter, UpdateQuery, {
            new: true, 
            ...options
        });
    }

    public async getAll(filter: QueryFilter<T> = {}, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
        return this.model.find(filter, projection, options);
    }

    public async update(filter: QueryFilter<T>, update: UpdateQuery<T>, options?: QueryOptions<T>) {
        return await this.model.findOneAndUpdate(filter, update, {
            new: true, 
            ...options
        });
    }

    public async delete(filter: QueryFilter<T>) {
        return await this.model.findOneAndDelete(filter);
    }
}