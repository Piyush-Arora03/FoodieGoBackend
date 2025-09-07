import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
export const RABBITMQ_URL = process.env.RABBITMQ_URL || "";
export const QUEUE_NAME = process.env.QUEUE_NAME || "";
export const EXCHANGE_NAME = process.env.EXCHANGE_NAME || "";
export const BINDING_KEY = process.env.BINDING_KEY || "";