import { Applicationexception } from "../common/exceptions/application.exception";
import { NotFound } from "../common/exceptions/notFound.exception";
import { ReporterCreateDto, ReporterToReturnDto } from "../dtos/reporter.dto";
import { Reporter } from "./repositories/domain/reporter";
import { IReporterRepository } from "./repositories/reporter.repository";
import { ArticleDto, Images } from "../dtos/article.dto";
import { IArticleRepository } from "./repositories/article.repository";
import { ArticlesPaginationParams } from "../dtos/pagination";

export class ReporterService{

    constructor(
        private readonly reporterRepository:IReporterRepository 
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
        

    public async store(entry:ReporterCreateDto):Promise<ReporterToReturnDto>{
        const reporterExists = await this.reporterRepository.findByEmail(entry.email);

        if(reporterExists){
            throw new Applicationexception('Email already in use')
        }
        const reporter = await this.reporterRepository.store(entry as Reporter);
        
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

    public async uploadReporterImage(image_name:string, reporter_id:number){
        await this.reporterRepository.uploadReporterImage(image_name, reporter_id);
    }
}