import { Worker } from "bullmq";
import { Job } from "bullmq";

import redisConnection from "../config/redisConfig";
import SampleJob from "../jobs/sampleJob";

export default function (queueName: string) {
    const worker = new Worker(
        queueName,
        async (job: Job) => {
            if (job.name === "SampleJob") {
                const sampleJobInstance = new SampleJob(job.data);
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