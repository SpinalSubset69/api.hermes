import { NotFound } from "../common/exceptions/notFound.exception";
import { ReporterCreateDto } from "../dtos/reporter.dto";
import { Article } from "./repositories/domain/article";
import { Reporter } from "./repositories/domain/reporter";
import { IReporterRepository } from "./repositories/reporter.repository";

export class ReporterService{

    constructor(
        private readonly reporterRepository:IReporterRepository
    ){}

    public async all(): Promise<Reporter[]>{
        return await this.reporterRepository.all();
    }

    public async findByIdWithoutArticles(reporter_id:number):Promise<Reporter>{
        const reporter=  await this.reporterRepository.findByIdWithoutArticles(reporter_id);

        if(reporter === null){
            throw new NotFound('Reporter');
        }

        return reporter as unknown as Reporter;
    }

    public async findReporterArticlesBasedOnId(reporter_id:number, pageSize:number = 5, page:number = 1):Promise<Article[]>{
        const articles =  await this.reporterRepository.findReporterArticlesBasedOnId(reporter_id, pageSize, page);
        if(articles === null){
            throw new NotFound('Articles');
        }
        return articles;        
    }

    public async getCountArticlesByReporterid(reporter_id:number):Promise<number>{
        return await this.reporterRepository.getCountArticlesByReporteridArticles(reporter_id);
    }

    public async store(entry:ReporterCreateDto):Promise<void>{
        await this.reporterRepository.store(entry as Reporter);
    }
}