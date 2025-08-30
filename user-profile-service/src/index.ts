import express, { Request, Response } from 'express'
import {PORT} from './config/dotenv.config'
const app=express();

app.use(express.json());
app.get('/health',(req:Request,res:Response)=>{
    res.status(200).json({
        message:`working fine at port :${PORT}`
    });
})

app.listen(PORT,async ()=>{
    console.log("server is working");
});