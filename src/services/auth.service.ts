import { Applicationexception } from "../common/exceptions/application.exception";
import { JwtService } from "./jwt.service";
import { IAuthRepository } from "./repositories/auth.repository";
import { ReporterLogIn } from "./repositories/domain/reporter";

export class AuthService{
    constructor(
        private authRepository:IAuthRepository,
        private jwtService:JwtService
    ){}

    public async login(entry:ReporterLogIn):Promise<string>{
        const reporter = await this.authRepository.login(entry);        
        if(!reporter){
            throw new Applicationexception('Invalid Credentials');
        }

        const token = this.jwtService.signJWt({
            id:  reporter.reporter_id
        });

        return token;
    }
}