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

    async handleGoogleSignIn(tokenId: string,role:Role) : Promise<{user: User & { roles: { role: Role }[] }, token: string}> {
        try {
            // console.log("tokenId ->",tokenId);
            const ticket = await client.verifyIdToken({
                idToken: tokenId,
                audience: GOOGLE_CLIENT_ID,
            });
            // console.log("ticket ->",ticket);
            const payload = ticket.getPayload();
            if(!payload || !payload.email) {
                throw new AppError("Invalid Google token", STATUS_CODE.UNAUTHORIZED);
            }
            const email = payload.email;
            let user:(User & { roles: { role: Role }[] }) | null;
            try {
                user = await this.authRepository.getUserWithRoleByEmail(email) as (User & { roles: { role: Role }[] }) | null;
                if(user){
                    const hasRole=user?.roles.some(p=>p.role==role);
                    const userId=user?.id?user.id:"";
                    if(!hasRole){
                        user= await this.authRepository.addRoleToUser(userId,role) as (User & { roles: { role: Role }[] }) | null;
                    }
                }else{
                    user = await this.registerUser(email, "", role) as (User & { roles: { role: Role }[] }) | null;
                }
            } catch (error) {
                if(error instanceof AppError && error.httpCode === STATUS_CODE.NOT_FOUND){
                    user = await this.registerUser(email, "", Role.CUSTOMER) as (User & { roles: { role: Role }[] }) | null;
                }else{
                    throw new AppError(`Error during Google sign-in ${error}`, STATUS_CODE.INTERNAL_SERVER_ERROR);
                }
            }
            if(!user){
                throw new AppError("Could not sign in user with Google", STATUS_CODE.NOT_FOUND);
            }
            let token = generateToken(user.id,role);
            return {user, token};
        } catch (error) {
            if(error instanceof AppError){
                throw error;
            }else{
                throw new AppError(`Error during Google sign-in  ${error}`, STATUS_CODE.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async registerUser(email: string, password: string, role:Role):Promise<User|null> {
        try {
            const existingUser:(User & { roles: { role: Role }[] }) | null  = await this.authRepository.getUserWithRoleByEmail(email);
            if(existingUser){
                if(existingUser.roles?.some(r => r.role === role)){
                    throw new AppError("User already exists with this role", STATUS_CODE.BAD_REQUEST);
                }
                const updatedUser = await this.authRepository.addRoleToUser(existingUser.id, role);
                return updatedUser;
            }
            else{
                const hashedPassword :string= await hashPassword(password);
                const user : User | null = await this.authRepository.registerUser(email, hashedPassword, role);
                return user;
            }
        } catch (error) {
            throw error;
        }
    }

    async loginUser(email: string, password: string,role:Role) : Promise<{user: User & { roles: { role: Role }[] }, token: string}> {
        try {
            const user : User & {roles:{role:Role}[]}|null= await this.authRepository.getUserWithRoleByEmail(email);
            if(!user){
                throw new AppError("Invalid credentials", STATUS_CODE.NOT_FOUND);
            }
            const passwordToCompare:string|null=user.password?user.password:""; 
            const isValidPassword:Boolean=await comparePassword(password,passwordToCompare);
            const currentRole : Role= role;
            if(!isValidPassword){
                throw new AppError("Invalid credentials . Password is incorrect", STATUS_CODE.UNAUTHORIZED);
            }
            if(!user.roles?.some(r => r.role === currentRole)){
                throw new AppError(`User does not have the required role ${role}`, STATUS_CODE.FORBIDDEN);
            }
            const token:string=generateToken(user.id,currentRole);
            return {user,token};
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;