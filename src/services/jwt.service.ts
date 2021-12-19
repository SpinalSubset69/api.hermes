import { config } from "../common/persistance/config";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedException } from "../common/exceptions/unauthorized.exception";

export class JwtService{
    
    public signJWt(payload:any):string{
        return jwt.sign({
            id: payload.id
        }, config.json__secret_key as string, {
            expiresIn: '15h'
        })
    }

    public verifyJwt(token:string){
       try{
        jwt.verify(token, config.json__secret_key as string);                
       }catch(err:any){
        throw new UnauthorizedException(err.message);
       }
    }

    public getJwtDecoded(token:string):JwtPayload{
       try{
        return jwt.verify(token, config.json__secret_key as string) as JwtPayload;
       }catch(err:any){
        throw new UnauthorizedException(err.message);
       }
    }
}