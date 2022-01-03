import { before, DELETE, GET, POST, route } from "awilix-express";
import { Request, response, Response } from "express";
import { ControllerBase } from "../common/controllers/base.controller";
import multer from "../middlewares/multer/multer";
import { FileUpload } from "../dtos/image.upload.dto";
import {
  ArticlesPagination,
  ArticlesPaginationParams,
} from "../dtos/pagination";
import { ArticleService } from "../services/article.service";
import { getImage } from "../util/get.image";
import { validateArticle } from "../util/validate/article.validate";
import { validateImagesArray } from "../util/validate/image.upload.validate";
import { AuthMiddleWare } from "../middlewares/auth/auth.middleware";
import { ISession } from "../interfaces/jwt.interfaces";

@route("/articles")
export class ArtcileController extends ControllerBase {
  constructor(private readonly articleService: ArticleService) {
    super();
  }

  @before([AuthMiddleWare])
  @route("/remove/:id")
  @DELETE()
  public async RemoveArticle(req: Request, res: Response) {
    try {
      const article_id = parseInt(req.params.id);
      await this.articleService.remove(article_id);

      res.status(200).json({
        message: "Article Removed Succesfully",
      });
    } catch (err: any) {
      this.handleException(err, res);
    }
  }

  @GET()
  public async GetArticles(req: Request, res: Response) {
    try {    
      const params = new ArticlesPaginationParams(
        parseInt(req.query.pageSize as string),
        parseInt(req.query.page as string),
        req.query.q as string,
        req.query.category as string,
        Number(req.query.reporter_id)
      );

      const articles = await this.articleService.all(params);
        const count = await this.articleService.getArticlesCountWithSpecifications(params);

        res.json({
            data: new ArticlesPagination(count, params.pageSize, params.page, articles)
        })

    } catch (err: any) {
      this.handleException(err, res);
    }
  }

  @route("/:id")
  @GET()
  public async GetArticleBaseOnId(req: Request, res: Response) {
    try {
      const article_id = parseInt(req.params.id);
      const article = await this.articleService.findArticleById(article_id);

      res.status(200).json({
        message: "Article Finded",
        data: article,
      });
    } catch (err: any) {
      this.handleException(err, res);
    }
  }

  @before([AuthMiddleWare])
  @POST()
  public async StoreArticle(req: Request, res: Response) {
    try {
      const article = validateArticle(req.body);
      const session: ISession = response.locals.session;
      console.log(session);

      const data = await this.articleService.store(article, session.id);

      res.status(200).json({
        message: "Article Stored Succesfully",
        data,
      });
    } catch (err: any) {
      this.handleException(err, res);
    }
  }

  @route("/getimage/:image")
  @GET()
  public async GetArticleImage(req: Request, res: Response) {
    try {
      const image_name = req.params.image;
      const image = await getImage("articles", image_name);
      res.status(200).sendFile(image);
    } catch (err: any) {
      this.handleException(err, res);
    }
  }

  @before([multer("articles").array("files", 4), AuthMiddleWare])
  @route("/uploadimages/:id")
  @POST()
  public async StoreImages(req: Request, res: Response) {
    try {
      const article_id = parseInt(req.params.id);
      const imagesInfo = await validateImagesArray(req.files as FileUpload[]);
      for (const image of imagesInfo) {
        await this.articleService.uploadImage(image.filename, article_id);
      }
      const message =
        imagesInfo.length === 1
          ? "Image Uploaded Succesfully"
          : "Images Uploaded Succesfully";

      res.status(200).json({
        message,
      });
    } catch (err: any) {
      this.handleException(err, res);
    }
  }
}
