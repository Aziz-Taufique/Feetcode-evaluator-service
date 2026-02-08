import { JAVA_IMAGE } from "../config/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import pullImagFromDockerHub from "./pullImage";


async function runJava(code: string, inputTestCase: string) {

    console.log("creating a new java container");

    // pull image 
    await pullImagFromDockerHub(JAVA_IMAGE);

    const rawLogBuffer: Buffer[] = [];

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;

    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']);
    const javaDockerContainer = await createContainer(JAVA_IMAGE, ["/bin/bash", "-c", runCommand]);
    await javaDockerContainer?.start();

    console.log("Started a new container");

    const logerStream = await javaDockerContainer?.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true
    });

    logerStream?.on("data", (chunk) => {
        rawLogBuffer.push(chunk);
    });

    await new Promise((res) => {

        logerStream?.on("end", () => {
            console.log(rawLogBuffer);
            const completedBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completedBuffer);
            console.log(decodedStream);
            console.log(decodedStream.stdout);

            res(decodedStream);
        });
    });

    await javaDockerContainer?.remove();
}

export default runJava;