import { Reporter } from "./domain/reporter";
import { ReporterLogIn } from "./domain/reporter";


export interface IAuthRepository{
    //It return JSOWEBTOKEN
    login(entry:ReporterLogIn):Promise<Reporter | null>;    
}