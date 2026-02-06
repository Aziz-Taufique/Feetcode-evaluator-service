import express, { Express, Request, Response } from "express";
import serverConfig from "./config/serverConfig";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send({ foo: "fsadsas" })
});

app.listen(serverConfig.PORT, () => {
    console.log(`Server is runnig at port ${serverConfig.PORT}`);
});