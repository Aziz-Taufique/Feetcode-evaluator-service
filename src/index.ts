import bodyParser from "body-parser";
import express, { Express } from "express";

import serverAdapter from "./config/bullMqDashboard";
import serverConfig from "./config/serverConfig";
import runPython from "./containers/runPythonDocker";
// import sampleProducer from "./prducers/sampleProducer";
import apiRouter from "./routes";
// import sampleWorker from "./workers/sampleWorker";

const app: Express = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/admin", serverAdapter.getRouter());
app.use("/api", apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server is runnig at port ${serverConfig.PORT}`);
    console.log("Visit http://localhost:3000/admin");


    // sampleWorker("SampleQueue");

    // sampleProducer("SampleJob", {
    //     id: 1,
    //     name: "max",
    //     age: 11,
    //     calss: "B.tech",
    // }, 2);

    // sampleProducer("SampleJob", {
    //     id: 1,
    //     name: "aziz",
    //     age: 22,
    //     calss: "B.tech",
    // }, 1);

    runPython("print('hello')");

});