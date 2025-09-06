import Redis from "ioredis";
import { RedisStore } from 'rate-limit-redis';
import { REDIS_PORT } from "./dotenv.config";
import { rateLimit } from "express-rate-limit";

const client:Redis=new Redis({
    host:'localhost',
    port:REDIS_PORT
});

const apiLimiter=rateLimit({
    windowMs:1000*60,
    max:5,
    standardHeaders:true,
    legacyHeaders:false,
    store: new RedisStore({
        sendCommand: async (...args: string[]): Promise<any> => {
            return client.call(...(args as [string , ...any[]])) as Promise<any>;
        },
    }),
    message:{
        success:false,
        message:"Too many requests, please try again later."
    }
});

export default apiLimiter