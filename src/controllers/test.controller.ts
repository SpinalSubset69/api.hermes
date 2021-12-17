import { GET, route } from "awilix-express";
import { Request, Response } from "express";
import { TestService } from "../services/test.service";

@route('/test')
export class TestController{
    constructor(
        private testService:TestService
    ){}
        @GET()
        public Test(req:Request, res:Response){
            res.send({
                message: 'it worked'
            })
        }
}