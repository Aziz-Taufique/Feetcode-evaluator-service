import sampeQueue from "../queues/sampeQueue";

export default async function (jobName: string, payload: Record<string, unknown>, priority: number) {
    await sampeQueue.add(jobName, payload, { priority });
    console.log("add a new job is done");
}