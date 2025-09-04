import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/dotenv.config';
import { AppError } from './app-error';
import { STATUS_CODE } from '../config/status-code.config';

export const generateToken = (userID: string, role: string) => {
    const token = jwt.sign({ id: userID, role }, JWT_SECRET, { expiresIn: '1d' });
    return token;
}

export const verifyToken = (token: string) => {
    try {
        console.log('token in verify token', token)
        const res = jwt.verify(token, JWT_SECRET);
        console.log('res in verify token', res)
        return res;
    } catch (error) {
        throw error;
    }
}