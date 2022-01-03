import { GET, POST, route, before } from "awilix-express";
import { Request, response, Response } from "express";
import { ControllerBase } from "../common/controllers/base.controller";
import {
  ArticlesPagination,
  ArticlesPaginationParams,
} from "../dtos/pagination";
import { ReporterCreateDto, ReporterWithArticles } from "../dtos/reporter.dto";
import { ReporterService } from "../services/reporter.service";
import { makeReporter } from "../util/validate/reporter.validate";
import multer from "../middlewares/multer/multer";
import { validateImage } from "../util/validate/image.upload.validate";
import { FileUpload } from "../dtos/image.upload.dto";
import { getImage } from "../util/get.image";
import { AuthMiddleWare } from "../middlewares/auth/auth.middleware";
import { JwtService } from "../services/jwt.service";
import { ISession } from "../interfaces/jwt.interfaces";
import { ArticleService } from "../services/article.service";

@route("/reporters")
export class ReporterController extends ControllerBase {
  constructor(
    private readonly reporterService: ReporterService,
    private jwtService: JwtService,
    private articleService: ArticleService
  ) {
    super();
  }

  @before([AuthMiddleWare])
  @GET()
  public async GetReporterByToken(req: Request, res: Response) {
    try {
      //Get params and session info to get articles and reporter
      const session: ISession = response.locals.session;

      const params = new ArticlesPaginationParams(
        parseInt(req.query.pageSize as string),
        parseInt(req.query.page as string),
        req.query.q as string,
        req.query.category as string,
        session.id
      );

      const reporter = await this.reporterService.findByIdWithoutArticles(
        session.id
      );
      const articles = await this.articleService.all(params);      

      //Reporter to Return with all data
      const reporterToReturn: ReporterWithArticles = {
        reporter: reporter,
        articles: articles,
      };
      res.status(200).json({
        message: "Reporter",
        data: reporterToReturn,
      });
    } catch (err: any) {
      this.handleException(err, res);
    }
  }

  @before([AuthMiddleWare])
  @POST()
  public async StoreReporter(req: Request, res: Response) {
    try {
      const reporterFromBody: ReporterCreateDto = req.body;
      const reporter = makeReporter(reporterFromBody);
      const reporterToSend = await this.reporterService.store(reporter);

      res.status(200).json({
        message: "Reporter Created Succesfully",
        data: reporterToSend,
      });
    } catch (err: any) {
      this.handleException(err, res);
    }
  }

  @route("/:id")
  @GET()
  public async GetReporterById(req: Request, res: Response) {
    try {
      const reporter = await this.reporterService.findByIdWithoutArticles(
        parseInt(req.params.id)
      );
      res.status(200).json({
        message: "Reporter",
        data: reporter,
      });
    } catch (err: any) {
      this.handleException(err, res);
    }
  }

  @route("/articles/:id")
  @GET()
  public async GetArticlesByReporterid(req: Request, res: Response) {
    try {
      const reporter_id = parseInt(req.params.id);
    
      const params = new ArticlesPaginationParams(
        parseInt(req.query.pageSize as string),
        parseInt(req.query.page as string),
        req.query.q as string,
        req.query.category as string,
        reporter_id
      );

      const articles = await this.articleService.all(params);
      const count = await this.articleService.getArticlesCountWithSpecifications(params);
      
      res.status(200).json({
        message: "Articles",
        data: new ArticlesPagination(
          count,
          params.pageSize,
          params.page,
          articles
        ),
      });
    } catch (err: any) {
      this.handleException(err, res);
    }
  }

  @before([multer("reporters").single("file"), AuthMiddleWare])
  @route("/uploadimage/:id")
  @POST()
  public async UploadReporterImage(req: Request, res: Response) {
    try {
      const reporter_id = parseInt(req.params.id);
      //Validate is an image
      const imageInfo = await validateImage(req.file as FileUpload);

      //store image name in the database based on the id
      await this.reporterService.uploadReporterImage(
        imageInfo.filename as string,
        reporter_id
      );

      res.status(200).send({
        message: "image uploaded succesfully",
      });
    } catch (err: any) {
      this.handleException(err, res);
    }
  }

  @route("/getimage/:image")
  @GET()
  public async GetReporterImage(req: Request, res: Response) {
    try {
      const image_name = req.params.image;
      const image = await getImage("reporters", image_name);
      res.status(200).sendFile(image);
    } catch (err: any) {
      this.handleException(err, res);
    }
  }
}
