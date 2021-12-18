import { Images } from "../../../../dtos/article.dto";
import { IArticleRepository } from "../../article.repository";
import { Article } from "../../domain/article";
import connector from "./../../../../common/persistance/mysql";

export class ArticleMySqlRepository implements IArticleRepository {
  public async getCountArticlesWithQuery(query: string): Promise<number> {
    const [rows]: any[] = await connector.execute(
      `SELECT COUNT(*) as Total FROM articles WHERE title LIKE '%${query}%' OR content LIKE '%${query}%' OR summary LIKE '%${query}%'`      
    );
    if (rows.length) {
      return rows[0].Total as number;
    }

    return 0;
  }

  public async queryOnArticles(
    query: string,
    pageSize: number,
    page: number
  ): Promise<Article[]> {
    const [rows]: any[] = await connector.query(
      `SELECT articles.article_id, articles.category_id, articles.title, articles.summary, articles.content, articles.created_at, articles.likes, 
      categories.name as category, reporters.name as reporter, reporters.reporter_id  FROM articles
      inner join categories on categories.category_id = articles.category_id
      inner join reporters on articles.reporter_id = reporters.reporter_id WHERE articles.title LIKE '%${query}%' OR articles.content LIKE '%${query}%' OR articles.summary LIKE '%${query}%'
      ORDER BY articles.article_id DESC LIMIT ? OFFSET ?`,
      [pageSize, page]
    );
    return rows as Article[];
  }
  public async getTotalArticlesCount(): Promise<number> {
    const [rows]: any[] = await connector.execute(
      "SElECT COUNT(*) as Total FROM articles"
    );      
    if (rows.length) {
      return rows[0].Total as number;
    }

    return 0;
  }
  public async getCountArticlesByCategory(
    category_id: number
  ): Promise<number> {
    const [rows]: any[] = await connector.execute(
      "SElECT COUNT(*) as Total FROM  articles WHERE category_id = ?",
      [category_id]
    );

    if (rows.length) {
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
  public async store(entry: Article): Promise<void> {
    const now = new Date();
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
  }
  public async remove(article_id: number): Promise<void> {
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
  public async all(pageSize: number, page: number): Promise<Article[]> {    
    const [rows]: any[] = await connector.query(
      `SELECT articles.article_id, articles.title, articles.summary, articles.content, articles.created_at, articles.likes, 
            categories.name as category, reporters.name as reporter, reporters.reporter_id  FROM articles
            inner join categories on categories.category_id = articles.category_id
            inner join reporters on articles.reporter_id = reporters.reporter_id ORDER BY article_id DESC LIMIT ? OFFSET ?`,
      [pageSize, (page - 1) * pageSize]
    );

    return rows as Article[];
  }
  public async findByCategory(
    category_id: number,
    pageSize: number,
    page: number
  ): Promise<Article[]> {
    const [rows]: any[] = await connector.query(
      `SELECT articles.article_id, articles.title, articles.summary, articles.content, articles.created_at, articles.likes, 
            categories.name as category, reporters.name as reporter, reporters.reporter_id  FROM articles
            inner join categories on categories.category_id = articles.category_id
            inner join reporters on articles.reporter_id = reporters.reporter_id 
            WHERE categories.category_id = ?
            ORDER BY article_id DESC LIMIT ? OFFSET ?`,
      [category_id, pageSize, (page - 1) * pageSize]
    );
    return rows as Article[];
  }
}
