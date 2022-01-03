import { Applicationexception } from "../common/exceptions/application.exception";
import { NotFound } from "../common/exceptions/notFound.exception";
import { CategoryCreateDto } from "../dtos/category.dto";
import { ICategoryRepository } from "./repositories/category.repository";
import { Category } from "./repositories/domain/category";

export class CategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async store(entry: CategoryCreateDto):Promise<Category> {
    const categoryOnDb = await this.categoryRepository.findByName(entry.name);

    if(categoryOnDb){
      throw new Applicationexception('Category Already Exists');
    }

    return await this.categoryRepository.store(entry as Category);
  }

  public async all(): Promise<Category[] | null> {
    return await this.categoryRepository.all();
  }

  public async update(entry: CategoryCreateDto, category_id: number) {
    const categoryOnDb = await this.categoryRepository.findByName(entry.name);

    if(categoryOnDb){
      throw new Applicationexception('Category Already Exists');
    }
    await this.categoryRepository.update(entry as Category, category_id);
  }

  public async findById(category_id: number): Promise<Category> {
    const category = await this.findById(category_id);

    if (!category) {
      throw new NotFound("Category");
    }

    return category;
  }

  public async remove(category_id: number): Promise<void> {
    const categoryOnDb = await this.categoryRepository.findById(category_id);

    if(!categoryOnDb){
      throw new NotFound('Category');
    }
    
    await this.categoryRepository.remove(category_id);
  }
}
