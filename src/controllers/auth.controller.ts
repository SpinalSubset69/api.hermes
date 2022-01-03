import { before, GET, POST, route } from "awilix-express";
import { Request, Response } from "express";
import { ControllerBase } from "../common/controllers/base.controller";
import { AuthService } from "../services/auth.service";
import { ReporterLogIn } from "../services/repositories/domain/reporter";
import { validateLogin } from "../util/validate/login.validate";

@route("/auth")
export class AuthController extends ControllerBase {
  constructor(private authService: AuthService) {
    super();
  }

  @route("/login")
  @POST()
  public async Login(req: Request, res: Response) {
    try {
      const entry = validateLogin(req.body as ReporterLogIn);
      const session = await this.authService.login(entry);
      console.log(session);
      res.status(200).json({
        message: "Login Succesfully",
        session,
      });
    } catch (err: any) {
      this.handleException(err, res);
    }
  }
}
