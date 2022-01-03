import { NotFound } from "../common/exceptions/notFound.exception";
import { ArticleCreateDto, ArticleDto, Images } from "../dtos/article.dto";
import {  ArticlesPaginationParams } from "../dtos/pagination";
import { IArticleRepository } from "./repositories/article.repository";
import { ICategoryRepository } from "./repositories/category.repository";
import { Article } from "./repositories/domain/article";
import { IReporterRepository } from "./repositories/reporter.repository";

export class ArticleService {
  constructor(
    private readonly articleRepository: IArticleRepository,
    private readonly categoryRepository: ICategoryRepository,
    private readonly reporterRepository: IReporterRepository
    ) {}

  public async store(entry: ArticleCreateDto, reporter_id:number):Promise<Article> {
    const category = await this.categoryRepository.findById(entry.category_id);
    const reporter = await this.reporterRepository.findByIdWithoutArticles(reporter_id);
    
    if(!category){
      throw new NotFound('Category');
    }
    
    if(!reporter){
      throw new NotFound('Reporter');
    }
    return await this.articleRepository.store({
      ...entry,
      reporter_id: reporter.reporter_id,
      category_id: category.category_id
    } as Article);
  }

  public async uploadImage( 
    image_name: string,
    article_id: number
  ): Promise<void> {
    await this.articleRepository.uploadImage(image_name, article_id);
  }

  public async findArticleById(article_id:number):Promise<ArticleDto>{
      const article = await this.articleRepository.findById(article_id);
      const images = await this.articleRepository.findArticleImages(article_id);      
      const articleToReturn:ArticleDto = article as unknown as ArticleDto;
      articleToReturn.images = images as Images[];
      return articleToReturn;
  }

  public async all(pagination:ArticlesPaginationParams): Promise<ArticleDto[]>{
    const articles = await this.articleRepository.all(pagination);
    const articlesToReturn:ArticleDto[] = [];
    for(const article of articles){
      const images = await this.articleRepository.findArticleImages(article.article_id);
      const articleToPush:ArticleDto = article as unknown as ArticleDto;
      articleToPush.images = images as Images[];      
      articlesToReturn.push(articleToPush);
    }

    return articlesToReturn;
  }

  public async getArticlesCountWithSpecifications(params:ArticlesPaginationParams):Promise<number>{
    return this.articleRepository.getCountArticlesWihtSpecifications(params);
  }
    
  public async remove(article_id:number):Promise<void>{
    await this.articleRepository.remove(article_id);
  }
 
}
