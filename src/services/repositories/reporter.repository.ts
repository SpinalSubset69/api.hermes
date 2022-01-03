import { Reporter } from "./domain/reporter";

export interface IReporterRepository{
    all():Promise<Reporter[]>;
    findByIdWithoutArticles(reporter_id:number): Promise<Reporter | null>;            
    store(entry:Reporter): Promise<Reporter>;    
    findByEmail(email:string):Promise<Reporter | null>;
    uploadReporterImage(image_name:string, reporter_id:number):Promise<void>;
}