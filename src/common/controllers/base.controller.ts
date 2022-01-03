import { Response } from "express";
import log from "../../util/logger";
import { Applicationexception } from "../exceptions/application.exception";
import { NotFound } from "../exceptions/notFound.exception";

export abstract class ControllerBase{
    handleException(err:any, res:Response){
        const statusCode = err instanceof Applicationexception ? 500 :
                            err instanceof NotFound ? 404 : 400;

    

        res.status(statusCode).json({
            statusCode,
            message: err.message,            
        }); 
    }

    OkResponseWithData(statusCode:number, message:string, data:any[], res:Response){
        res.status(statusCode).json({
            message,
            data
        });
    }
}