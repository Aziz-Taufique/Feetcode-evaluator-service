import { DOCKER_STREAM_HEADER_SIZE } from "../config/constants";
import DockerStreamOutput from "../types/dockerStreamOutput";

export default function decodeDockerStream(buffer: Buffer) {
    let offset = 0;

    const output: DockerStreamOutput = {
        stdout: "",
        stderr: "",
    };

    while (offset < buffer.length) {

        const typeOfStream = buffer[offset];

        const length = buffer.readUint32BE(offset + 4);

        offset += DOCKER_STREAM_HEADER_SIZE;

        if (typeOfStream === 1) {
            //stdout stream
            output.stdout += buffer.toString("utf-8", offset, offset + length);
        } else if (typeOfStream === 2) {
            //stderr stream
            output.stderr += buffer.toString("utf-8", offset, offset + length);
        }

        offset += length;
    }
    return output;
}