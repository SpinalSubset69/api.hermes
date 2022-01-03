import { NextFunction, Request, response, Response } from "express";
import {
  DecodedResult,
  ExpirationStatus,
  ISession,
} from "../../interfaces/jwt.interfaces";
import { JwtService } from "../../services/jwt.service";
import { config } from "../../common/persistance/config";

const jwtService = new JwtService();

export async function AuthMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const unauthorized = (message: string) =>
    res.status(401).json({
      ok: false,
      status: 401,
      message: message,
    });

  const requestHeader = "X-Access-Token";
  const responseHeader = "X-RenewedToken";

  const header = req.header(requestHeader);

  if (!header) {
    unauthorized(`Required ${requestHeader} header not found`);
    return;
  }

  const decodedSession: DecodedResult = await jwtService.decodeSession(
    config.json__secret_key as string,
    header
  );

  if (
    decodedSession.type === "integrity-error" ||
    decodedSession.type === "invalid-token"
  ) {
    unauthorized(
      `Failed to decode or validate authorization token. Reason: ${decodedSession.type}`
    );
    return;
  }

  const expiration: ExpirationStatus = checkExpirationStatus(
    decodedSession.session
  );

  if (expiration === "expired") {
    unauthorized(`Authorization token has expired, Please create  new token`);
    return;
  }

  let session: ISession;

  if (expiration === "grace") {
    const { token, expiresIn, issued } = await jwtService.encodeSession(
      config.json__secret_key as string,
      decodedSession.session
    );
  
    session = {
        ...decodedSession.session,
        expiresIn: Number(expiresIn),
        issued: Number(issued)
    }
  } else {
    session = decodedSession.session;
  }

  // Set the session on response.locals object for routes to access
  response.locals = {
      ...response.locals,
      session: session
  }



  next();
}

function checkExpirationStatus(token: ISession): ExpirationStatus {
  const now = Date.now();
  if (token.expiresIn > now) return "active";

  //Find the timestamp for the end of the token's grace period
  const threehoursinMin = 3 * 60 * 60 * 1000;
  const threehoursAfterExpiration = token.expiresIn + threehoursinMin;

  if (threehoursAfterExpiration > now) return "grace";

  return "expired";
}
