import { config } from "../common/persistance/config";
import { UnauthorizedException } from "../common/exceptions/unauthorized.exception";
import { decode, encode, TAlgorithm } from "jwt-simple";
import { DecodedResult, EncodeResult, ISession, PartialSession } from "../interfaces/jwt.interfaces";
export class JwtService{
    
    public encodeSession(secretKey:string, partialSession:PartialSession):EncodeResult{
        const algorithm:TAlgorithm = 'HS512';

        //Determine whe the session should end
        const issued = Date.now();

        const fifteenminutes = 15 * 60 * 1000; //In Miliseconds
        const expiresIn = issued + fifteenminutes;        
        const session:ISession = {
            id: partialSession.id,
            username: partialSession.username,
            dateCreated: partialSession.dateCreated,
            issued: issued,
            expiresIn: expiresIn
        };

        return{
            token: encode(session,secretKey, algorithm),
            issued: issued.toString(),
            expiresIn: expiresIn.toString()
        }
    }

    public async decodeSession(secretKey:string, tokenString:string):Promise<DecodedResult>{
        const algorithm:TAlgorithm = 'HS512';

        let result:ISession;

        try{
            result = await decode(tokenString, secretKey, false, algorithm);            
        }catch(_e:any){
            const e: Error = _e;
            
            if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
                return {
                    type: "invalid-token"
                };
            }
            if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
                return {
                    type: "integrity-error"
                };
            }
    
            // Handle json parse errors, thrown when the payload is nonsense
            if (e.message.indexOf("Unexpected token") === 0) {
                return {
                    type: "invalid-token"
                };
            }
    
            throw e;
        }

        return{
            type: 'valid',
            session: result
        }
    }
   
}