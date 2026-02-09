import { Job } from "bullmq";

import runCpp from "../containers/cppRunDocker";
import runJava from "../containers/runJavaDocker";
import runPython from "../containers/runPythonDocker";
import { IJob } from "../types/bullMqJobDefinition";
import { SubmissionPayload } from "../types/submitionPayload";


export default class SubmitionJob implements IJob {
    name: string;
    payload: Record<string, SubmissionPayload>;
    constructor(payload: Record<string, SubmissionPayload>) {
        this.name = this.constructor.name;
        this.payload = payload;
    }

    handle = async (job?: Job) => {
        console.log("Handler of job called.");
        console.log(this.payload);

        if (!job) return;

        const keys = Object.keys(this.payload);
        const key = keys[0];

        const submission = this.payload[key];

        if (submission.language === "CPP") {
            const response = await runCpp(submission.code, submission.inputCode);

            console.log("FFFFF", response);
        } else if (submission.language === "PYTHON") {
            const response = await runPython(submission.code, submission.inputCode);

            console.log("FFFFF", response);
        } else {
            const res = await runJava(submission.code, submission.inputCode);
            console.log("haa", res);

        }
    };

    failed = (job?: Job) => {
        console.log("job failed");
        console.log(job?.id);
    };
}