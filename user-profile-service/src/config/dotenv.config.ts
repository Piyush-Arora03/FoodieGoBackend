import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const GOOGLE_MAPS_API_KEY= process.env.GOOGLE_MAPS_API_KEY || "";