import Docker from "dockerode";

async function createContainer(ImageDocker: string, CmdEcecutable: string[]) {
    console.log("fofo");
    try {

        const docker = new Docker();

        const container = await docker.createContainer({
            Image: ImageDocker,
            Cmd: CmdEcecutable,
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Tty: false,
            OpenStdin: true
        });
        return container;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log("ff", error.message);
    }
}

export default createContainer;