import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const SUPABASE_URL=process.env.SUPABASE_URL || "YOUR_PROJECT_URL_FROM_SETTINGS";
export const SUPABASE_SERVICE_KEY=process.env.SUPABASE_SERVICE_KEY || "YOUR_SERVICE_ROLE_KEY_FROM_SETTINGS";
export const NODE_ENV=process.env.NODE_ENV || "development";