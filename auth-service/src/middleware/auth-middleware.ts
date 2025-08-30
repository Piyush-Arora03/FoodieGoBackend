import { Request, Response, NextFunction } from 'express';
import {verifyToken} from '../utils/jwt';
import { AppError } from '../utils/app-error';
import { STATUS_CODE } from '../config/status-code.config';
import  AuthRepository  from '../repository/auth-repository';
import { Role,User } from '@prisma/client';

const authRepository = new AuthRepository();

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const protect = async (req:Request, res:Response, next:NextFunction) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token){
            return next(new AppError('You are not logged in', STATUS_CODE.UNAUTHORIZED));
        }
        const decoded = verifyToken(token) as {id:string, role:string, iat:number, exp:number};
        const currentUser:User=await authRepository.getUserByEmail(decoded.id);
        if(!currentUser){
            return next(new AppError('The user belonging to this token does no longer exist', STATUS_CODE.UNAUTHORIZED));
        }
        req.user= currentUser;
        next();
    } catch (error) {
        throw new AppError('Invalid token', STATUS_CODE.UNAUTHORIZED);
    }
}

export const restrictTo = (...roles:Role[]) => {
    try {
        return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', STATUS_CODE.FORBIDDEN));
        }
        next();
    };
    } catch (error) {
        throw new AppError('Error in role restriction middleware', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}