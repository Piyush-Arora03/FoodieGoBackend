import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/dotenv.config';

export const generateToken=(userID:string,role:string)=>{
    const token =jwt.sign({id:userID,role},JWT_SECRET,{expiresIn:'1h'});
    return token;
}

export const verifyToken=(token:string)=>{
    return jwt.verify(token,JWT_SECRET);
}