import { GET, POST, route } from "awilix-express";
import { Request, Response } from "express";
import { ControllerBase } from "../common/controllers/base.controller";
import { ArticlesPagination, ArticlesPaginationParams } from "../dtos/pagination";
import { ReporterCreateDto } from "../dtos/reporter.dto";
import { ReporterService } from "../services/reporter.service";
import { makeReporter } from "../util/validate/reporter.validate";

@route('/reporters')
export class ReporterController extends ControllerBase{
    
    constructor(
        private readonly reporterService:ReporterService
    ){
        super();
    }

    @POST()
    public async StoreReporter(req:Request, res:Response){
        try{            
            const reporterFromBody:ReporterCreateDto = req.body;            
            const reporter = makeReporter(reporterFromBody);
            await this.reporterService.store(reporter);

            res.status(200).json({
                message: 'Reporter Created Succesfully'
            });
        }catch(err:any){
            this.handleException(err, res,);
        }
    }

    @route('/:id')
    @GET()    
    public async GetReporterById(req:Request, res:Response){
        try{
            const reporter = await this.reporterService.findByIdWithoutArticles(parseInt(req.params.id));
            res.status(200).json({
                message: 'Reporter',
                data: reporter
            });
        }catch(err:any){
            this.handleException(err, res);
        }
    }

    @route('/articles/:id')
    @GET()
    public async GetArticlesByReporterid(req:Request, res:Response){
        try{
            const articlesParams = new ArticlesPaginationParams(parseInt(req.params.id as string), parseInt(req.query.pageSize as string) , parseInt(req.query.page as string));
            const articles = await this.reporterService.findReporterArticlesBasedOnId(articlesParams.reporter_id, articlesParams.pageSize, articlesParams.page);
            const count = await this.reporterService.getCountArticlesByReporterid(articlesParams.reporter_id);            
            res.status(200).json({
                message: 'Articles',
                data: new ArticlesPagination(count, articlesParams.pageSize, articlesParams.page, articles)
            });
        }catch(err:any){    
            this.handleException(err, res);
        }
    }
}