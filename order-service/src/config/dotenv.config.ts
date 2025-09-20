import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const REDIS_PORT=process.env.REDIS_PORT||6379;
export const REDIS_HOST=process.env.REDIS_HOST||"127.0.0.1";
export const RESTAURANT_SERVICE_URL=process.env.RESTAURANT_SERVICE_URL||"http://localhost:3000";