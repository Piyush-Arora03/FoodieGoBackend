import  AuthService  from "../service/auth-service";
import { Request, Response } from "express";
import { STATUS_CODE } from "../config/status-code.config";
import { AppError } from "../utils/app-error";
import { Role } from "../../node_modules/.prisma/auth-client";
import { roleMapper } from "../utils/role-mapper";


class AuthController {
    private authService;
    constructor() {
        this.authService = new AuthService();
    }

    registerUser = async (req:Request, res:Response) => {
        try {
            const {email, password}:{ email:string, password:string} = req.body;
            const packageName : string = req.headers['x-package-name'] as string
            const role:Role = roleMapper(packageName);
            const user = await this.authService.registerUser(email, password, role);
            res.status(STATUS_CODE.CREATED).json({
                message: "User registered successfully",
                data: user,
                status: "success"
            })
        } catch (error:AppError | any) {
            res.status(error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR).json({
                message: error.message || "Internal Server Error",
                status: "error",
            });
        }
    }

    loginUser = async (req:Request, res:Response) => {
        try {
            const {email, password}:{ email:string, password:string } = req.body;
            const packageName : string = req.headers['x-package-name'] as string
            const role:Role = roleMapper(packageName);
            const {user, token} = await this.authService.loginUser(email, password,role);
            res.status(STATUS_CODE.OK).json({
                message: "User logged in successfully",
                data: {user, token},
                status: "success"
            })  
        } catch (error:AppError | any) {
            res.status(error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR).json({
                message: error.message || "Internal Server Error",
                status: "error",
            });
        }
    }

    handleGoogleSignIn = async (req:Request, res:Response) => {
        try {
            const {token , provider}= req.body;
            if(provider !== 'google'){
                throw new AppError("Unsupported OAuth provider", STATUS_CODE.BAD_REQUEST);
            }
            const packageName : string = req.headers['x-package-name'] as string
            const role:Role = roleMapper(packageName);
            // console.log("Package Name:", packageName, "Mapped Role:", role);
            const result = await this.authService.handleGoogleSignIn(token,role);
            res.status(STATUS_CODE.OK).json({
                message: "User signed in with Google successfully",
                data: result,
                status: "success"
            });
        } catch (error: AppError | any) {
            res.status(error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR).json({
                message: error.message || "Internal Server Error",
                status: "error",
            });
        }
    }

}

export default AuthController;