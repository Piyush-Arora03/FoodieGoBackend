import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject, ZodRawShape } from 'zod';
import { STATUS_CODE } from '../config/status-code.config';

export const validate = (schema: ZodObject<ZodRawShape>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
                headers: req.headers,
            });
            return next();
        } catch (error: any) {
            console.log(error);
            const errorMessages = error.issues.map((err: any) => err.message);
            return res.status(STATUS_CODE.BAD_REQUEST).json({
                status: 'error',
                message: 'Invalid input',
                errors: errorMessages,
            });
        }
    };