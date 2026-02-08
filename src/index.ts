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

    const code1 = `x = input()
print("I am:", x.lower())
print("I am in upper case:", x.upper())
print("full name is", x + " Taufique")
`;

    const code2 = `
x = input();
print("Value of x is:", x);
for i in range(int(x)):
  print(i);
`;
    const code3 = `
x = input();
y = input();
print("Value of x is:", x);
print("Value of y is:", y);
print("Sum of x and y is:", int(x) + int(y));
print("diff of x and y is:", int(x) - int(y));
print("prod of x and y is:", int(x) * int(y));

`;

    runPython(code1, "Aziz");
    runPython(code2, "10");
    runPython(code3, `2\n3`);

});