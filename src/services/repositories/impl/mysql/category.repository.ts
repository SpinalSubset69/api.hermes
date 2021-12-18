import { ICategoryRepository } from "../../category.repository";
import { Category } from "../../domain/category";
import connector from "./../../../../common/persistance/mysql";

export class CategoryMySqlRepository implements ICategoryRepository{
    
    public async store(entry: Category): Promise<void> {
        await connector.execute(
            'INSERT INTO categories(name) VALUES(?)',
            [entry.name]
        )
    }
    
    public async update(entry: Category): Promise<void> {
        await connector.execute(
            'UPDATE categories SET name = ? WHERE category_id = ?',
            [entry.name, entry.category_id]
        );
    }
    
    public async findById(category_id: number): Promise<Category | null> {
        const [rows]:any[] = await connector.execute(
            'SELECT * FROM categories WHERE category_id = ?',
            [category_id]
        );

        if(rows.length){
            return rows[0] as Category;
        }

        return null;
    }
    
    public async remove(category_id: number): Promise<void> {
        await connector.execute(
            'DELETE FROM categories WHERE category_id = ?',
            [category_id]
        )
    }

}