import { asClass, createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application } from "express";
import { ReporterService } from "./services/reporter.service";
import { ReporterMySqlRepository } from "./services/repositories/impl/mysql/reporter.repository";

export default (app:Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
       
        //Repositories
        reporterRepository: asClass(ReporterMySqlRepository).scoped(),


        //Services
        reporterService: asClass(ReporterService).scoped()
        
    });
    app.use(scopePerRequest(container));
}