import express,{Request , Response , NextFunction, Application} from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";

const app :Application = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

app.get('/health', (req:Request, res:Response, next:NextFunction) => {
    res.status(200).json({message: "Profile Service is running"});
});

app.use('/api/user', routes);


export default app;


