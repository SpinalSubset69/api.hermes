import { NextFunction, Request, Response } from "express";
import { ControllerBase } from "../../common/controllers/base.controller";
import { UnauthorizedException } from "../../common/exceptions/unauthorized.exception";
import { JwtService } from "../../services/jwt.service";

const jwtService = new JwtService();

export function AuthMiddleWare(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers['x-access-token'] as string;
        jwtService.verifyJwt(token);        
        next();
    } catch (err: any) {
        const statusCode = err instanceof UnauthorizedException ? 401 : 500;
        res.status(statusCode).json(
            { message: err.message }
        )
    }
}