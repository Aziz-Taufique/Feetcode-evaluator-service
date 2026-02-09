import bodyParser from "body-parser";
import express, { Express } from "express";

import serverAdapter from "./config/bullMqDashboard";
import serverConfig from "./config/serverConfig";
// import runCpp from "./containers/cppRunDocker";
import submitionProducer from "./prducers/submitionProducer";
// import runJava from "./containers/runJavaDocker";
// import runPython from "./containers/runPythonDocker";
// import sampleProducer from "./prducers/sampleProducer";
import apiRouter from "./routes";
import submitionWorker from "./workers/submitionWorker";
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
    submitionWorker("SubmitionQueue");

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

    //     const code1 = `x = input()
    // print("I am:", x.lower())
    // print("I am in upper case:", x.upper())
    // print("full name is", x + " Taufique")
    // `;

    //     const code = `
    // x = input();
    // print("Value of x is:", x);
    // for i in range(int(x)):
    // print(i);
    // `;

    // const code = `
    // x = input();
    // y = input();
    // print("Value of x is:", x);
    // print("Value of y is:", y);
    // print("Sum of x and y is:", int(x) + int(y));
    // print("diff of x and y is:", int(x) - int(y));
    // print("prod of x and y is:", int(x) * int(y));
    // `;

    //     runPython(code1, "Aziz");
    //     runPython(code2, "10");
    //     runPython(code3, `2\n3`);

    const code = `
    import java.util.Scanner;
    public class Main {
    public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    String x = sc.nextLine();
    System.out.println("Value of x is: " + x);

    int n = Integer.parseInt(x);
    for (int i = 0; i < n; i++) {
    System.out.println(i);
    }
    }
    }
    `;

    // runJava(javaCode, "9");

    // const userCode = `
    // class Solution {
    // public:
    // vector<int> permut(){
    // vector<int> v;
    // v.push_back(232);
    // v.push_back(121);
    // return v; 
    // }
    // };
    // `;

    // const code = `
    // #include<iostream>
    // #include<vector>
    // using namespace std;

    // ${userCode}

    // int main(){
    // Solution s;
    // vector<int> res = s.permut();
    // cout<<"Val in res at 0 pos: "<<res[0]<<endl;
    // cout<<"Val in res at 1 pos: "<<res[1]<<endl;

    // int x;
    // cin>>x;
    // cout<<"Value of x is: "<<x<<endl;
    // for(int i = 0;i<int(x);i++){
    // cout<<i<<endl;
    // }
    // return 0;
    // }
    // `;

    const inputCode = '10';

    // runCpp(cppCode, input);

    submitionProducer({
        "1234": {
            language: "JAVA",
            inputCode,
            code
        }
    });



});