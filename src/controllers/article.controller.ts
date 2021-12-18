import { before, DELETE, GET, POST, route } from "awilix-express";
import { Request, Response } from "express";
import { ControllerBase } from "../common/controllers/base.controller";
import multer from "../common/multer/multer.articles";
import { FileUpload } from "../dtos/image.upload.dto";
import { ArticlesPagination, ArticlesPaginationParams } from "../dtos/pagination";
import { ArticleService } from "../services/article.service";
import { getImage } from "../util/get.image";
import { validateArticle } from "../util/validate/article.validate";
import { validateImagesArray } from "../util/validate/image.upload.validate";

@route('/articles')
export class ArtcileController extends ControllerBase{
    constructor(
        private readonly articleService:ArticleService
    ){
        super();
    }

    @route('/remove/:id')
    @DELETE()
    public async RemoveArticle(req:Request, res:Response){
        try{
            const article_id = parseInt(req.params.id);
            await this.articleService.remove(article_id);

            res.status(200).json({
                message: 'Article Removed Succesfully'
            })
        }catch(err:any){
            this.handleException(err, res);
        }
    }
    
    @GET()
    @route('/search')
    public async QueryOnArticles(req:Request, res:Response){
        try{
            const query = req.query.q as string;
            const params = new ArticlesPaginationParams(parseInt(req.query.pageSize as string) , parseInt(req.query.page as string));
            const articles = await this.articleService.getArticlesWithQuery(query, params);
            const count = await this.articleService.getCountArticlesWithQuery(query);

            res.status(200).json({
                message:'Articles',
                data: new ArticlesPagination(count, params.pageSize, params.page, articles)
            })
        }catch(err:any){
            this.handleException(err, res);
        }
    }

    @route('/category/:category')
    @GET()
    public async GetArticlesByCategory(req:Request, res:Response){
        try{
            const category_id = parseInt(req.params.category);
            const params = new ArticlesPaginationParams(parseInt(req.query.pageSize as string) , parseInt(req.query.page as string));
            const articles = await this.articleService.findByCategory(category_id, params);
            const count = await this.articleService.getCountArticlesbyCategory(category_id);
            res.status(200).json({
                message:'Articles',
                data : new ArticlesPagination(count, params.pageSize, params.page, articles)
            });
        }catch(err:any){
            this.handleException(err, res);
        }
    }

    @GET()
    public async All(req:Request, res:Response){
        try{            
            const params = new ArticlesPaginationParams(parseInt(req.query.pageSize as string) , parseInt(req.query.page as string));
            const articles = await this.articleService.all(params);
            const count = await this.articleService.getCountTotalArticles();
            res.status(200).json({
                message:'Articles',
                data : new ArticlesPagination(count, params.pageSize, params.page, articles)
            })
        }catch(err:any){
            this.handleException(err, res);
        }
    }

    @route('/:id')
    @GET()
    public async GetArticleBaseOnId(req:Request, res:Response){
        try{
            const article_id = parseInt(req.params.id);
            const article = await this.articleService.findArticleById(article_id);

            res.status(200).json({
                message: 'Article Finded',
                data:article
            })
        }catch(err:any){
            this.handleException(err, res);
        }
    }

    @POST()
    public async StoreArticle(req:Request, res:Response){
        try{
            const article = validateArticle(req.body);
            this.articleService.store(article);

            res.status(200).json({
                message: 'Article Stored Succesfully'
            });
        }catch(err:any){
            this.handleException(err, res);
        }
    }

    @route('/getimage/:image')
    @GET()
    public async GetArticleImage(req:Request, res:Response){
        try{
            const image_name = req.params.image;
            const image = await getImage('articles', image_name);

            res.status(200).sendFile(image);
        }catch(err:any){
            this.handleException(err, res); 
        }
    }

    @before([multer.array('files',4)])
    @route('/uploadimages/:id')
    @POST()
    public async StoreImages(req:Request, res:Response){
        try{            
            const article_id = parseInt(req.params.id);
            const imagesInfo = await validateImagesArray(req.files as FileUpload[]);            
            for(let image of imagesInfo ){
                await this.articleService.uploadImage(image.filename, article_id);
            }
            const message = imagesInfo.length === 1 ? 'Image Uploaded Succesfully' : "Images Uploaded Succesfully" ;
            
            res.status(200).json({
                message
            }
            );
        }catch(err:any){
            this.handleException(err, res);
        }
    }
}