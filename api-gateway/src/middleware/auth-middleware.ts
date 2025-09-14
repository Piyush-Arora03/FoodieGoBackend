import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "@foodiego/common-types";
import jwt from 'jsonwebtoken';


declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const userPayload = JSON.stringify({ id: decoded.id, role: decoded.role });
    req.headers['x-user-payload'] = userPayload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};