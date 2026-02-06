import express, { Express } from "express";

import serverConfig from "./config/serverConfig";
import sampleProducer from "./prducers/sampleProducer";
import apiRouter from "./routes";
import sampleWorker from "./workers/sampleWorker";

const app: Express = express();

app.use("/api", apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server is runnig at port ${serverConfig.PORT}`);


    sampleWorker("SampleQueue");

    sampleProducer("SampleJob", {
        id: 1,
        name: "max",
        age: 11,
        calss: "B.tech",
    }, 2);

    sampleProducer("SampleJob", {
        id: 1,
        name: "aziz",
        age: 22,
        calss: "B.tech",
    }, 1);

});