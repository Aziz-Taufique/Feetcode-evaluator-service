import Redis from "ioredis";

import serverConfig from "./serverConfig";

const redisConfig = {
    port: serverConfig.REDIS_PORT,
    host: serverConfig.REDIS_HOST

};

export default new Redis(redisConfig);