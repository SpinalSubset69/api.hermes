import { Category } from "./domain/category";

export interface ICategoryRepository{
    store(entry:Category):Promise<Category>;
    update(entry:Category, category_id:number):Promise<void>;
    findById(category_id:number):Promise<Category | null>;
    findByName(name:string):Promise<Category | null>;
    remove(category_id:number):Promise<void>;
    all():Promise<Category[] | null>;
}