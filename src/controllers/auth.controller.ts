import { POST, route } from "awilix-express";
import { Request, Response } from "express";
import { ControllerBase } from "../common/controllers/base.controller";
import { AuthService } from "../services/auth.service";
import { ReporterLogIn } from "../services/repositories/domain/reporter";
import { validateLogin } from "../util/validate/login.validate";
import { config } from "../common/persistance/config";

@route('/auth')
export class AuthController extends ControllerBase{

    constructor(
        private authService:AuthService
    ){
        super();
    }

    @route('/login')
    @POST()
    public async Login(req:Request, res:Response){
        try{
            const entry = validateLogin(req.body as ReporterLogIn); 
            const token = await this.authService.login(entry);

            res.status(200).json({
                message: 'Login Succesfully',
                token,
                expiresIn: new Date().setTime(new Date().getTime() + (config.expiresIn * 60 * 60 * 1000))
            })

        }catch(err:any){
            this.handleException(err, res);
        }
    }
}