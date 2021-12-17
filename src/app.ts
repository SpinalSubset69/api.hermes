import express, { Application } from "express";
import cors from "cors";
import loadContainer from "./container";
import { loadControllers } from "awilix-express";

const app: Application = express();

//midlewares
app.use(express.json());
//app.use(cors);

//add IOC to each request
loadContainer(app);

//load controllers
app.use(loadControllers("controllers/*.ts", { cwd: __dirname }));

export { app };
