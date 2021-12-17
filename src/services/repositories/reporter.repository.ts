import { Article } from "./domain/article";
import { Reporter } from "./domain/reporter";

export interface IReporterRepository{
    all():Promise<Reporter[]>;
    findByIdWithoutArticles(reporter_id:number): Promise<Reporter | null>;
    findReporterArticlesBasedOnId(reporter_id:number, pageSize?:number, page?:number): Promise<Article[] | null>;
    getCountArticlesByReporteridArticles(reporter_id:number): Promise<number>;
    store(entry:Reporter): Promise<void>;
}