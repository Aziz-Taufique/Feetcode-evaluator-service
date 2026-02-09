import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

import sampleQueue from "../queues/sampeQueue";
import submitionQueue from "../queues/submitionQueue";

const serverAdapter = new ExpressAdapter();
createBullBoard({
    queues: [new BullMQAdapter(sampleQueue), new BullMQAdapter(submitionQueue)],
    serverAdapter: serverAdapter,
});

export default serverAdapter.setBasePath("/admin");