import  AuthRepository  from "../repository/auth-repository";
import { Role, User } from "@prisma/client";
import { comparePassword, hashPassword } from "../utils/password";
import { AppError } from "../utils/app-error";
import {STATUS_CODE} from "../config/status-code.config";
import { generateToken } from "../utils/jwt";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../config/dotenv.config";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

class AuthService {
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = new AuthRepository();
    }

    async handleGoogleSignIn(tokenId: string) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: tokenId,
                audience: GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            if(!payload || !payload.email) {
                throw new AppError("Invalid Google token", STATUS_CODE.UNAUTHORIZED);
            }
            const email = payload.email;
            let user:User;
            try {
                user = await this.authRepository.getUserByEmail(email);
            } catch (error) {
                if(error instanceof AppError && error.httpCode === STATUS_CODE.NOT_FOUND){
                    user = await this.registerUser(email, "", Role.CUSTOMER) as User;
                }else{
                    throw new AppError("Error during Google sign-in", STATUS_CODE.INTERNAL_SERVER_ERROR);
                }
            }
            let token = generateToken(user.id, user.role);
            return {user, token};
        } catch (error) {
            if(error instanceof AppError){
                throw error;
            }else{
                throw new AppError("Error during Google sign-in", STATUS_CODE.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async registerUser(email: string, password: string, role:Role) {
        try {
            const existingUser = await this.authRepository.getUserByEmailForRegister(email);
            if(existingUser){
                throw new AppError("User already exists", STATUS_CODE.BAD_REQUEST);
            }
            const hashedPassword = await hashPassword(password);
            const user = await this.authRepository.registerUser(email, hashedPassword, role);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async loginUser(email: string, password: string) {
        try {
            const user : User= await this.authRepository.loginUser(email);
            const passwordToCompare:string=user.password?user.password:"";
            const isValidPassword=await comparePassword(password,passwordToCompare);
            if(!isValidPassword){
                throw new AppError("Invalid credentials", STATUS_CODE.UNAUTHORIZED);
            }
            const token=generateToken(user.id,user.role);
            return {user,token};
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;