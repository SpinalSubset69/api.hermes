import express, { Application } from "express";
import loadContainer from "./container";
import { loadControllers } from "awilix-express";
import cors from 'cors';

const app: Application = express();

//midlewares
app.use(cors());
app.use(express.json());

//add IOC to each request
loadContainer(app);

//load controllers
app.use(loadControllers("controllers/*.ts", { cwd: __dirname }));


export { app };
