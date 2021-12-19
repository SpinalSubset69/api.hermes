import { Article } from "../../domain/article";
import { Reporter } from "../../domain/reporter";
import { IReporterRepository } from "../../reporter.repository";
import connector from "./../../../../common/persistance/mysql";
import SHA from "sha.js";

export class ReporterMySqlRepository implements IReporterRepository {
  public async uploadReporterImage(
    image_name: string,
    reporter_id: number
  ): Promise<void> {
    await connector.execute(
      "UPDATE reporters SET image = ? WHERE reporter_id = ?",
      [image_name, reporter_id]
    );
  }
  public async findByEmail(email: string): Promise<Reporter | null> {
    const [rows]: any[] = await connector.execute(
      "SElECT * FROM reporters WHERE email =  ?",
      [email]
    );
    if (rows.length) {
      return rows[0] as Reporter;
    }
    return null;
  }
  public async getCountArticlesByReporteridArticles(
    reporter_id: number
  ): Promise<number> {
    const [rows]: any[] = await connector.execute(
      "SElECT COUNT(*) as Total FROM  articles WHERE reporter_id = ?",
      [reporter_id]
    );

    if (rows.length) {
      return rows[0].Total as number;
    }
    return 0;
  }

  public async store(entry: Reporter): Promise<void> {
    //hash password
    const hashedPassword = SHA("SHA256")
      .update(entry.password)
      .digest("base64");
    await connector.execute(
      "INSERT INTO reporters(name, user_name, password, email) VALUES(?, ?, ?, ?)",
      [entry.name, entry.user_name, hashedPassword, entry.email]
    );
  }

  public async all(): Promise<Reporter[]> {
    const [rows]: any[] = await connector.execute("SELECT * FROM reporters");
    return rows as Reporter[];
  }

  public async findByIdWithoutArticles(
    reporter_id: number
  ): Promise<Reporter | null> {
    const [rows]: any[] = await connector.execute(
      "SELECT * FROM reporters WHERE reporter_id = ?",
      [reporter_id]
    );

    if (rows.length) {
      return rows[0] as Reporter;
    }

    return null;
  }
  public async findReporterArticlesBasedOnId(
    reporter_id: number,
    pageSize: number = 5,
    page: number = 1
  ): Promise<Article[]> {
    const [rows]: any[] = await connector.query(
      `SELECT articles.article_id, articles.title, articles.summary, articles.content, articles.created_at, articles.likes, categories.name as category 
      FROM articles inner join categories on categories.category_id = articles.category_id 
      WHERE articles.reporter_id = ?  ORDER BY articles.article_id DESC LIMIT ? OFFSET ?`,
      [reporter_id, pageSize, (page - 1) * pageSize]
    );
    return rows as Article[];
  }
}
