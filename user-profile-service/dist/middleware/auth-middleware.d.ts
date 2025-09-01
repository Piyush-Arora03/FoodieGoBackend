import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "@foodiego/common-types";
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
export declare const protect: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth-middleware.d.ts.map