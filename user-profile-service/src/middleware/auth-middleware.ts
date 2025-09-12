import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import { STATUS_CODE } from "../config/status-code.config";
import { verifyToken } from '../utils/jwt'
import { JwtPayload } from "@foodiego/common-types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    console.log("protect is called");
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    console.log("token is", token);
    if (!token) {
      return next(new AppError('You are not logged in', STATUS_CODE.UNAUTHORIZED));
    }
    const decoded = verifyToken(token) as JwtPayload;
    console.log("decoded data is", decoded);
    req.user = { id: decoded.id!!, role: decoded.role };
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    throw new AppError('Error while authentication', STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
}