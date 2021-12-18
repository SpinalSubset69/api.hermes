import { Images } from "../../dtos/article.dto";
import { Article } from "./domain/article";

export interface IArticleRepository{    
    store(entry:Article):Promise<void>;
    remove(article_id:number):Promise<void>;
    findArticleImages(article_id:number):Promise<Images[] | null>;
    findById(article_id:number):Promise<Article | null>;
    all(pageSize:number, page:number):Promise<Article[]>;
    queryOnArticles(query:string, pageSize:number, page:number):Promise<Article[]>;
    findByCategory(category_id:number, pageSize:number, page:number):Promise<Article[]>;
    uploadImage(image_name:string, article_id:number):Promise<void>;
    getCountArticlesByCategory(category_id:number):Promise<number>;
    getTotalArticlesCount():Promise<number>;
    getCountArticlesWithQuery(query:string):Promise<number>;
}