import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

import sampleQueue from "../queues/sampeQueue";

const serverAdapter = new ExpressAdapter();
createBullBoard({
    queues: [new BullMQAdapter(sampleQueue)],
    serverAdapter: serverAdapter,
});

export default serverAdapter.setBasePath("/admin");