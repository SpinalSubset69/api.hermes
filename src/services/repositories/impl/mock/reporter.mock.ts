import { Article } from "../../domain/article";
import { Reporter } from "../../domain/reporter";
import { IReporterRepository } from "../../reporter.repository";
import { reporters } from "../../../../common/persistance/mock";
import SHA from "sha.js";
export class ReporterMockRepository implements IReporterRepository{    

    public async all(): Promise<Reporter[]> {
        return await reporters;
    }

    public async findByIdWithoutArticles(reporter_id: number): Promise<Reporter | null> {
        const reporter = await reporters.filter(r => r.reporter_id === reporter_id);

        if(reporter.length > 0){
            return reporter[0];
        }

        return null;
    }
    findReporterArticlesBasedOnId(reporter_id: number, pageSize?: number, page?: number): Promise<Article[]> {
        throw new Error("Method not implemented.");
    }
    getCountArticlesByReporteridArticles(reporter_id: number): Promise<number> {
        throw new Error("Method not implemented.");
    }
    public async store(entry: Reporter): Promise<Reporter> {
        entry.password = SHA('SHA256').update(entry.password).digest('base64');
        entry.reporter_id = reporters.length + 1;
        await reporters.push(entry);
        return entry;
    }
    public async findByEmail(email: string): Promise<Reporter | null> {
        const reporter = await reporters.filter(r => r.email === email);

        if(reporter){
            return reporter[0] as Reporter;
        }

        return null;
    }
    uploadReporterImage(image_name: string, reporter_id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}