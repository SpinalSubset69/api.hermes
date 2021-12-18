import { asClass, createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application } from "express";
import { ArticleService } from "./services/article.service";
import { ReporterService } from "./services/reporter.service";
import { ArticleMySqlRepository } from "./services/repositories/impl/mysql/article.repository";
import { ReporterMySqlRepository } from "./services/repositories/impl/mysql/reporter.repository";

export default (app:Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
       
        //Repositories
        reporterRepository: asClass(ReporterMySqlRepository).scoped(),
        articleRepository:asClass(ArticleMySqlRepository).scoped(),


        //Services
        reporterService: asClass(ReporterService).scoped(),
        articleService: asClass(ArticleService).scoped()
        
    });
    app.use(scopePerRequest(container));
}