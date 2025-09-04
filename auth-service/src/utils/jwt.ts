import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/dotenv.config';
import { JwtPayload } from '@foodiego/common-types';

export const generateToken=(data:JwtPayload)=>{
    const token =jwt.sign(data,JWT_SECRET,{expiresIn:'1d'});
    return token;
}

export const verifyToken=(token:string)=>{
    return jwt.verify(token,JWT_SECRET);
}