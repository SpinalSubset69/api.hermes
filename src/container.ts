import { asClass, createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application } from "express";
import { ArticleService } from "./services/article.service";
import { AuthService } from "./services/auth.service";
import { CategoryService } from "./services/category.service";
import { JwtService } from "./services/jwt.service";
import { ReporterService } from "./services/reporter.service";
import { ArticleMySqlRepository } from "./services/repositories/impl/mysql/article.repository";
import { AuthMySqlRepository } from "./services/repositories/impl/mysql/auth.repository";
import { CategoryMySqlRepository } from "./services/repositories/impl/mysql/category.repository";
import { ReporterMySqlRepository } from "./services/repositories/impl/mysql/reporter.repository";

export default (app:Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
       
        //Repositories
        reporterRepository: asClass(ReporterMySqlRepository).scoped(),
        articleRepository:asClass(ArticleMySqlRepository).scoped(),
        categoryRepository:asClass(CategoryMySqlRepository).scoped(),
        authRepository:asClass(AuthMySqlRepository).scoped(),

        //Services
        reporterService: asClass(ReporterService).scoped(),
        articleService: asClass(ArticleService).scoped(),
        categoryService:asClass(CategoryService).scoped(),
        authService:asClass(AuthService).scoped(),
        jwtService:asClass(JwtService).scoped()
        
    });
    app.use(scopePerRequest(container));
}