import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./config/logger.config"
import apiRoutes from "./routes";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Restaurant Service is running" });
});

app.use('/api', apiRoutes);


export default app;


