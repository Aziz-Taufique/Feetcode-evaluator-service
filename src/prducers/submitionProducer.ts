import submitionQueue from "../queues/submitionQueue";


export default async function (payload: Record<string, unknown>) {
    await submitionQueue.add("SubmitionJob", payload);
    console.log("Added subition job to queue");
}