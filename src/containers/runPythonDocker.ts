import { PYTHON_IMAGE } from "../config/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import pullImagFromDockerHub from "./pullImage";


async function runPython(code: string, inputTestCase: string) {

    console.log("creating a new python container");

    // pull image 
    await pullImagFromDockerHub(PYTHON_IMAGE);

    const rawLogBuffer: Buffer[] = [];

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;

    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']);
    const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ["/bin/bash", "-c", runCommand]);
    await pythonDockerContainer?.start();

    console.log("Started a new container");

    const logerStream = await pythonDockerContainer?.logs({
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

    await pythonDockerContainer?.remove();
}

export default runPython;