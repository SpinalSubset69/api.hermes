import { Category } from "./domain/category";

export interface ICategoryRepository{
    store(entry:Category):Promise<void>;
    update(entry:Category):Promise<void>;
    findById(category_id:number):Promise<Category | null>;
    remove(category_id:number):Promise<void>;
}