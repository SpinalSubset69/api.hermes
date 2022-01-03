import { Applicationexception } from "../common/exceptions/application.exception";
import { JwtService } from "./jwt.service";
import { IAuthRepository } from "./repositories/auth.repository";
import { ReporterLogIn } from "./repositories/domain/reporter";
import { config } from "../common/persistance/config";
import { EncodeResult, PartialSession } from "../interfaces/jwt.interfaces";

export class AuthService{
    constructor(
        private authRepository:IAuthRepository,
        private jwtService:JwtService
    ){}

    public async login(entry:ReporterLogIn):Promise<EncodeResult>{
        const reporter = await this.authRepository.login(entry);        
        
        if(!reporter){
            throw new Applicationexception('Invalid Credentials');
        }           
        
        const partialSession:PartialSession = {
            id: reporter.reporter_id,
            username: reporter.user_name,
            dateCreated: Date.now()
        };

        const token = await this.jwtService.encodeSession(config.json__secret_key as string, partialSession);

        return token;
    }
}