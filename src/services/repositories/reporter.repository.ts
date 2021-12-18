import { Article } from "./domain/article";
import { Reporter } from "./domain/reporter";

export interface IReporterRepository{
    all():Promise<Reporter[]>;
    findByIdWithoutArticles(reporter_id:number): Promise<Reporter | null>;
    findReporterArticlesBasedOnId(reporter_id:number, pageSize?:number, page?:number): Promise<Article[]>;
    getCountArticlesByReporteridArticles(reporter_id:number): Promise<number>;
    store(entry:Reporter): Promise<void>;    
    findByEmail(email:string):Promise<Reporter | null>;
    uploadReporterImage(image_name:string, reporter_id:number):Promise<void>;
}