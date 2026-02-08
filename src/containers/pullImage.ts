import Docker from "dockerode";

export default async function pullPythonImageFromDuckerHub(imageName: string) {

    try {
        const docker = new Docker();

        await docker.ping();
        console.log("Docker is reachable");

        return new Promise((res, rej) => {
            docker.pull(imageName, (err: Error, stream: NodeJS.ReadableStream) => {
                if (err) return rej(err);

                if (!stream) {
                    return rej(new Error("Docker stream is null"));
                }

                docker.modem.followProgress(stream, (err, response) => err ? rej(err) : res(response), (event) => {
                    console.log(event.status);
                });
            });
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

