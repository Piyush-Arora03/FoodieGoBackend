import IOredis from 'ioredis'
import logger from '../config/logger.config'
import { REDIS_HOST,REDIS_PORT } from './dotenv.config';

const redisClient=new IOredis({
    host:REDIS_HOST,
    port:REDIS_PORT as number,
});

redisClient.on('connect',()=>{
    logger.info('Connected to Redis successfully!');
});

redisClient.on('error',(error)=>{
    logger.error('Error connecting to Redis:',error);
});

export default redisClient;



