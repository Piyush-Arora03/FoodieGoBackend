import winston from "winston";
const { combine, timestamp, printf, json, colorize, errors } = winston.format;
import { NODE_ENV } from "./dotenv.config";


const devLogFormat = printf(({ level, message, timestamp, stack }) =>
    `${timestamp} ${level}: ${stack || message}`
);

const isProd = (NODE_ENV === 'production');

const logger = winston.createLogger({
    level: isProd ? 'info' : 'debug',
    format: isProd
        ? combine(errors({ stack: true }), timestamp(), json())
        : combine(colorize(), errors({ stack: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), colorize(), devLogFormat),
    transports: [new winston.transports.Console()]
});

export default logger;
