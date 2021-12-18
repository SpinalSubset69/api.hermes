import { GET, POST, route, before } from "awilix-express";
import { Request, Response } from "express";
import { ControllerBase } from "../common/controllers/base.controller";
import { ArticlesPagination, ArticlesPaginationParams } from "../dtos/pagination";
import { ReporterCreateDto } from "../dtos/reporter.dto";
import { ReporterService } from "../services/reporter.service";
import { makeReporter } from "../util/validate/reporter.validate";
import multer from "../common/multer/multer";
import { validateImage } from "../util/validate/image.upload.validate";
import { FileUpload } from "../dtos/image.upload.dto";
import { getImage } from "../util/get.image";


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
            const id = parseInt(req.params.id);
            const articlesParams = new ArticlesPaginationParams(parseInt(req.query.pageSize as string) , parseInt(req.query.page as string));
            const articles = await this.reporterService.findReporterArticlesBasedOnId(id, articlesParams.pageSize, articlesParams.page);
            const count = await this.reporterService.getCountArticlesByReporterid(id);            
            res.status(200).json({
                message: 'Articles',
                data: new ArticlesPagination(count, articlesParams.pageSize, articlesParams.page, articles)
            });
        }catch(err:any){    
            this.handleException(err, res);
        }
    }
    
    @before([multer.single('file')])
    @route('/uploadimage/:id')    
    @POST()    
    public async UploadReporterImage(req:Request, res:Response){
        try{            
            const reporter_id = parseInt(req.params.id);
            //Validate is an image 
            const imageInfo = await validateImage(req.file as FileUpload);            

            //store image name in the database based on the id
            await this.reporterService.uploadReporterImage( imageInfo.filename as string ,reporter_id);

            res.status(200).send({
                message: 'image uploaded succesfully'
            });

        }catch(err:any){
            this.handleException(err, res);
        }
    }

    @route('/getimage/:image')
    @GET()
    public async GetReporterImage(req: Request, res:Response){
        try{
            const image_name = req.params.image;
            const image = await getImage('reporters', image_name);
            res.status(200).sendFile(image);
        }catch(err:any){
            this.handleException(err, res);
        }
    }
}