import { Images } from "../../../../dtos/article.dto";
import { ArticlesPaginationParams } from "../../../../dtos/pagination";
import { IArticleRepository } from "../../article.repository";
import { Article } from "../../domain/article";
import connector from "./../../../../common/persistance/mysql";

export class ArticleMySqlRepository implements IArticleRepository {
  
  public async getCountArticlesWihtSpecifications(params: ArticlesPaginationParams): Promise<number> {
    let query = `SELECT COUNT(*) as Total FROM articles 
                    INNER JOIN reporters ON reporters.reporter_id = articles.reporter_id
                    INNER JOIN categories ON categories.category_id = articles.category_id `;
                        
    if(params.query){
      const prefix = query.includes('WHERE') ? 'AND' : 'WHERE';
      query += `${prefix} articles.title LIKE '%${params.query}%' `
    }

    if(params.reporter_id){
      const prefix = query.includes('WHERE') ? 'AND' : 'WHERE';
      query += `${prefix} reporters.reporter_id = ${params.reporter_id} `
    }

    if(params.category){
      const prefix = query.includes('WHERE') ? 'AND' : 'WHERE';
      query += `${prefix} categories.name LIKE '%${params.category}%' `
    }
    const [rows]:any = await connector.query(query, []);

    if(rows.length){
      return rows[0].Total as number;
    }

    return 0;
    
  }  

  public async findArticleImages(article_id: number): Promise<Images[] | null> {
    const [rows]: any[] = await connector.execute(
      "SElECT name from images WHERE article_id = ?",
      [article_id]
    );

    if (rows.length) {
      return rows as Images[];
    }

    return null;
  }
  public async uploadImage(
    image_name: string,
    article_id: number
  ): Promise<void> {
    await connector.execute(
      "INSERT INTO images(name, article_id) VALUES(?, ?)",
      [image_name, article_id]
    );
  }
  public async store(entry: Article): Promise<Article> {
    const now = new Date();
    console.log(entry);
    await connector.execute(
      "INSERT INTO articles(title, summary, content, reporter_id, category_id, created_at) VALUES(?, ? ,? ,? ,? ,?)",
      [
        entry.title,
        entry.summary,
        entry.content,
        entry.reporter_id,
        entry.category_id,
        now,
      ]
    );

    const [article]:any[] = await connector.execute('SELECT * FROM articles ORDER BY article_id DESC LIMIT 1');

    return article[0] as Article;
  }
  public async remove(article_id: number): Promise<void> {

    await connector.execute(
      'DELETE FROM images WHERE article_id = ?',
      [article_id]
    )

    await connector.execute(
      'DELETE FROM articles WHERE article_id = ?',
      [article_id]
    )
  }
  public async findById(article_id: number): Promise<Article | null> {
    const [rows]: any[] = await connector.execute(
      `SELECT articles.category_id, articles.title, articles.summary, articles.content, articles.created_at, articles.likes, 
           categories.name as category, reporters.name as reporter, reporters.reporter_id  FROM articles
           inner join categories on categories.category_id = articles.category_id
           inner join reporters on articles.reporter_id = reporters.reporter_id WHERE article_id = ?`,
      [article_id]
    );
    if (rows.length) {
      return rows as Article;
    }

    return null;
  }


  public async all(params:ArticlesPaginationParams): Promise<Article[]> {    
    let query = `SELECT articles.article_id, articles.title, articles.summary, articles.content, articles.created_at, articles.likes, 
    categories.name as category, reporters.name as reporter, reporters.reporter_id  FROM articles
    inner join categories on categories.category_id = articles.category_id
    inner join reporters on articles.reporter_id = reporters.reporter_id `

    if(params.query){
      const prefix = query.includes('WHERE') ? 'AND' : 'WHERE'      
      query += `${prefix} articles.title LIKE '%${params.query}%' `
    }

    if(params.reporter_id){
      const prefix = query.includes('WHERE') ? 'AND' : 'WHERE';
      query += `${prefix} reporters.reporter_id = ${params.reporter_id} `
    }

    if(params.category){
      const prefix = query.includes('WHERE') ? 'AND' : 'WHERE'      
      query += `${prefix} categories.name LIKE '%${params.category}%' `
    }

    query += 'ORDER BY article_id DESC '

    if(params.pageSize){
      query += `LIMIT ${params.pageSize} `
    }

    if(params.page){
      query += `OFFSET ${(params.page - 1)  * params.pageSize}`
    }
          
    const [rows]: any[] = await connector.query(
       query      , []
    );

    return rows as Article[];
  }
}
