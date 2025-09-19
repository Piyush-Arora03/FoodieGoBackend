import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const SUPABASE_URL = process.env.SUPABASE_URL || "YOUR_PROJECT_URL_FROM_SETTINGS";
export const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || "YOUR_SERVICE_ROLE_KEY_FROM_SETTINGS";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY || null;
export const REDIS_PORT=process.env.REDIS_PORT||6379;
export const REDIS_HOST=process.env.REDIS_HOST||"127.0.0.1";