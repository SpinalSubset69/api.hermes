import { before, DELETE, GET, POST, PUT, route } from "awilix-express";
import { ControllerBase } from "../common/controllers/base.controller";
import { CategoryService } from "../services/category.service";
import { Request, Response } from "express";
import { Category } from "../services/repositories/domain/category";
import { CategoryCreateDto } from "../dtos/category.dto";
import { AuthMiddleWare } from "../middlewares/auth/auth.middleware";
import { validateCategory } from "../util/validate/category.validate";

@route("/category")
export class CategoryController extends ControllerBase {
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  @GET()
  public async All(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.all();
      return this.OkResponseWithData(
        200,
        "Categories",
        categories as Category[],
        res
      );
    } catch (err: any) {
      this.handleException(err, res);
    }
  }

  @before([AuthMiddleWare])
  @POST()
  public async Store(req: Request, res: Response) {
    try {
      const category = req.body; 
      const categoryStored = await this.categoryService.store(
        category as CategoryCreateDto
      );

      res.status(200).json({
        message: "Category Saved",
        data: categoryStored,
      });
    } catch (err: any) {
      this.handleException(err, res);
    }
  }

  @before([AuthMiddleWare])  
  @PUT()
  @route('/:id')
  public async UpdateCategory(req:Request, res:Response){
    try{
      const category = validateCategory(req.body);
      const category_id = parseInt(req.params.id);
      await this.categoryService.update(category, category_id);

      res.status(200).json({
        message: 'category updated'
      });
    }catch(err:any){
      this.handleException(err, res);
    }
  }

  @before([AuthMiddleWare])
  @DELETE()
  @route('/:id')
  public async DeleteCategory(req:Request, res:Response){
    try{
      const category_id = parseInt(req.params.id);
      await this.categoryService.remove(category_id);
      
      res.status(200).json({
        message: 'Category Deleted'
      });
    }catch(err:any){
      this.handleException(err, res);
    }
  }
}
