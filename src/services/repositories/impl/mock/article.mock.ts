import { Images } from "../../../../dtos/article.dto";
import { IArticleRepository } from "../../article.repository";
import { Article } from "../../domain/article";

export class ArticleMockRepository implements IArticleRepository{
    store(entry: Article): Promise<Article> {
        throw new Error("Method not implemented.");
    }
    remove(article_id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findArticleImages(article_id: number): Promise<Images[] | null> {
        throw new Error("Method not implemented.");
    }
    findById(article_id: number): Promise<Article | null> {
        throw new Error("Method not implemented.");
    }
    all(pageSize: number, page: number): Promise<Article[]> {
        throw new Error("Method not implemented.");
    }
    queryOnArticles(query: string, pageSize: number, page: number): Promise<Article[]> {
        throw new Error("Method not implemented.");
    }
    findByCategory(category_id: number, pageSize: number, page: number): Promise<Article[]> {
        throw new Error("Method not implemented.");
    }
    uploadImage(image_name: string, article_id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getCountArticlesByCategory(category_id: number): Promise<number> {
        throw new Error("Method not implemented.");
    }
    getTotalArticlesCount(): Promise<number> {
        throw new Error("Method not implemented.");
    }
    getCountArticlesWithQuery(query: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

}