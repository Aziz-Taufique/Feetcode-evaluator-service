import { CPP_IMAGE } from "../config/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import pullImagFromDockerHub from "./pullImage";


async function runCpp(code: string, inputTestCase: string) {

    console.log("creating a new python container");

    // pull image 
    await pullImagFromDockerHub(CPP_IMAGE);

    const rawLogBuffer: Buffer[] = [];

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;

    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']);
    const cppDockerContainer = await createContainer(CPP_IMAGE, ["/bin/bash", "-c", runCommand]);
    await cppDockerContainer?.start();

    console.log("Started a new container");

    const logerStream = await cppDockerContainer?.logs({
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

    await cppDockerContainer?.remove();
}

export default runCpp;