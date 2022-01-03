import { Images } from "../../dtos/article.dto";
import { ArticlesPaginationParams } from "../../dtos/pagination";
import { Article } from "./domain/article";

export interface IArticleRepository{    
    store(entry:Article):Promise<Article>;
    remove(article_id:number):Promise<void>;
    findArticleImages(article_id:number):Promise<Images[] | null>;
    findById(article_id:number):Promise<Article | null>;
    all(params:ArticlesPaginationParams):Promise<Article[]>;     
    uploadImage(image_name:string, article_id:number):Promise<void>;
    getCountArticlesWihtSpecifications(params:ArticlesPaginationParams):Promise<number>;
}