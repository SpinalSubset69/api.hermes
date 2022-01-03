import { ICategoryRepository } from "../../category.repository";
import { Category } from "../../domain/category";
import connector from "./../../../../common/persistance/mysql";

export class CategoryMySqlRepository implements ICategoryRepository {
  public async findByName(name: string): Promise<Category | null> {
    const [rows]: any[] = await connector.execute(
      "SELECT * FROM categories WHERE name = ?",
      [name]
    );

    if (rows.length) {
      return rows[0] as Category;
    }

    return null;
  }
  public async all(): Promise<Category[] | null> {
    const [rows]: any[] = await connector.execute(
      "SELECT category_id, name FROM categories "
    );

    if (rows.length) {
      return rows as Category[];
    }

    return null;
  }
  public async store(entry: Category): Promise<Category> {
    await connector.execute("INSERT INTO categories(name) VALUES(?)", [
      entry.name,
    ]);
    const [rows]:any[] = await connector.execute('SELECT * FROM categories ORDER BY category_id DESC LIMIT 1')
    return rows[0] as Category;
  }

  public async update(entry: Category, category_id:number): Promise<void> {
    await connector.execute(
      "UPDATE categories SET name = ? WHERE category_id = ?",
      [entry.name,category_id]
    );
  }

  public async findById(category_id: number): Promise<Category | null> {
    const [rows]: any[] = await connector.execute(
      "SELECT * FROM categories WHERE category_id = ?",
      [category_id]
    );

    if (rows.length) {
      return rows[0] as Category;
    }

    return null;
  }

  public async remove(category_id: number): Promise<void> {
    await connector.execute("DELETE FROM categories WHERE category_id = ?", [
      category_id,
    ]);
  }
}
