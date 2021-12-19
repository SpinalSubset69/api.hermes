import { NotFound } from "../common/exceptions/notFound.exception";
import { ArticleCreateDto, ArticleDto, ArticleToReturnDto } from "../dtos/article.dto";
import { ArticlesPagination, ArticlesPaginationParams } from "../dtos/pagination";
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

  public async store(entry: ArticleCreateDto) {
    const category = await this.categoryRepository.findById(entry.category_id);
    const reporter = await this.reporterRepository.findByIdWithoutArticles(entry.reporter_id);

    if(!category){
      throw new NotFound('Category');
    }
    
    if(!reporter){
      throw new NotFound('Reporter');
    }
    await this.articleRepository.store(entry as Article);
  }

  public async uploadImage(
    image_name: string,
    article_id: number
  ): Promise<void> {
    await this.articleRepository.uploadImage(image_name, article_id);
  }

  public async findArticleById(article_id:number):Promise<ArticleToReturnDto>{
      const article = await this.articleRepository.findById(article_id);
      const images = await this.articleRepository.findArticleImages(article_id);      
      return {
        article: article,
        images: images
      } as ArticleToReturnDto;
  }

  public async all(pagination:ArticlesPaginationParams): Promise<ArticleToReturnDto[]>{
    const articles = await this.articleRepository.all(pagination.pageSize, pagination.page);
    let articlesToReturn:ArticleToReturnDto[] = [];
    for(let article of articles){
      const images = await this.articleRepository.findArticleImages(article.article_id);
      
      articlesToReturn.push({
        article: article as unknown as  ArticleDto,
        images: images
      });
    }

    return articlesToReturn;
  }

  public async findByCategory(category_id:number, pagination:ArticlesPaginationParams){
    const articles = await this.articleRepository.findByCategory(category_id,pagination.pageSize, pagination.page);
    let articlesToReturn:ArticleToReturnDto[] = [];
    for(let article of articles){
      const images = await this.articleRepository.findArticleImages(article.article_id);
      
      articlesToReturn.push({
        article: article as unknown as  ArticleDto,
        images: images
      });
    }

    return articlesToReturn;
  }

  public async getArticlesWithQuery(query:string, pagination:ArticlesPaginationParams){
    const articles = await this.articleRepository.queryOnArticles(query,pagination.pageSize, pagination.page);
    console.log(articles);
    let articlesToReturn:ArticleToReturnDto[] = [];
    for(let article of articles){
      const images = await this.articleRepository.findArticleImages(article.article_id);
      
      articlesToReturn.push({
        article: article as unknown as  ArticleDto,
        images: images
      });
    }
    return articlesToReturn;
  }

  public async remove(article_id:number):Promise<void>{
    await this.articleRepository.remove(article_id);
  }

  public async getCountArticlesWithQuery(query:string):Promise<number>{
    return await this.articleRepository.getCountArticlesWithQuery(query);
  }
  public async getCountArticlesbyCategory(category_id:number):Promise<number>{
    return await this.articleRepository.getCountArticlesByCategory(category_id);
  }

  public async getCountTotalArticles():Promise<number>{
    return await this.articleRepository.getTotalArticlesCount();
  }
}
