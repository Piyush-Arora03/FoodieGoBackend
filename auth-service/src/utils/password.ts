import bcrypt from 'bcrypt';
import {SALT_ROUNDS} from '../config/dotenv.config';

export const hashPassword = async (password:string)=>{
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
}

export const comparePassword = async (password:string, hashedPassword:string)=>{
    return await bcrypt.compare(password, hashedPassword);
}