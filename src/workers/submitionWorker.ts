import { Worker } from "bullmq";
import { Job } from "bullmq";

import redisConnection from "../config/redisConfig";
import SubmitionJob from "../jobs/submitionJob";

export default function (queueName: string) {
    console.log("fofo", queueName);
    const worker = new Worker(
        queueName,
        async (job: Job) => {
            console.log(job.name);
            if (job.name === "SubmitionJob") {
                const sampleJobInstance = new SubmitionJob(job.data);
                sampleJobInstance.handle(job);
            }
        },
        {
            connection: redisConnection
        }
    );

    worker.on("completed", (job) => {
        console.log(`${job.id} has completed!`);
    });

    worker.on("failed", (job, err) => {
        console.log(`${job?.id} has failed with ${err.message}`);
    });
}