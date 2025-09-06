import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const REDIS_PORT=process.env.REDIS_PORT?parseInt(process.env.REDIS_PORT) : 6379;