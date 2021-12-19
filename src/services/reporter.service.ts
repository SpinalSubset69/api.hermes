import { Applicationexception } from "../common/exceptions/application.exception";
import { NotFound } from "../common/exceptions/notFound.exception";
import { ReporterCreateDto, ReporterToReturnDto } from "../dtos/reporter.dto";
import { Article } from "./repositories/domain/article";
import { Reporter } from "./repositories/domain/reporter";
import { IReporterRepository } from "./repositories/reporter.repository";
import fs from 'fs';
import path from 'path';
import { ArticleDto, ArticleToReturnDto } from "../dtos/article.dto";
import { IArticleRepository } from "./repositories/article.repository";

export class ReporterService{

    constructor(
        private readonly reporterRepository:IReporterRepository,
        private readonly articleRepository:IArticleRepository
    ){}

    public async all(): Promise<Reporter[]>{
        return await this.reporterRepository.all();
    }

    public async findByIdWithoutArticles(reporter_id:number):Promise<ReporterToReturnDto>{
        const reporter=  await this.reporterRepository.findByIdWithoutArticles(reporter_id);        
        if(reporter === null){
            throw new NotFound('Reporter');
        }
        const reporterToReturn:ReporterToReturnDto = {
            reporter_id: reporter.reporter_id,
            name: reporter.name,
            user_name: reporter.user_name,
            email: reporter.email,
            biography: reporter.biography,
            phone: reporter.phone,
            image: reporter.image
        }

        return reporterToReturn;
    }

    public async findReporterArticlesBasedOnId(reporter_id:number, pageSize:number = 5, page:number = 1):Promise<ArticleToReturnDto[]>{
        //get articles without images
        const articles =  await this.reporterRepository.findReporterArticlesBasedOnId(reporter_id, pageSize, page);
        //Array to return with the information
        const articlesToReturn:ArticleToReturnDto[] = [];                

        //Iterates each artcile and gets each article images to be addded in the object to return
        for(let article of articles){
            const images = await this.articleRepository.findArticleImages(article.article_id);
            articlesToReturn.push({
                article: article as unknown as ArticleDto,
                images: images
            })
        }           
        return articlesToReturn;        
    }

    public async getCountArticlesByReporterid(reporter_id:number):Promise<number>{
        return await this.reporterRepository.getCountArticlesByReporteridArticles(reporter_id);
    }

    public async store(entry:ReporterCreateDto):Promise<void>{
        const reporterExists = await this.reporterRepository.findByEmail(entry.email);

        if(reporterExists){
            throw new Applicationexception('Email already in use')
        }

        await this.reporterRepository.store(entry as Reporter);
    }

    public async uploadReporterImage(image_name:string, reporter_id:number){
        await this.reporterRepository.uploadReporterImage(image_name, reporter_id);
    }
}