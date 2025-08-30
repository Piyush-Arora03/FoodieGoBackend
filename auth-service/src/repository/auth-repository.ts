import { Role,User } from "@prisma/client";
import { prisma } from "../db";
import { AppError } from "../utils/app-error";
import {STATUS_CODE} from '../config/status-code.config';


class AuthRepository {
    async registerUser(email:string,password:string,role:Role){
        try{ 
            const user= await prisma.user.create({
                data:{
                    email,
                    password,
                    role
                }
            });
            return user;
        } catch (error) {
            throw new AppError("Error creating user",STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async loginUser(email:string){
        try {
            const user= await prisma.user.findUnique({
                where:{
                    email
                }
            });
            if(!user){
                throw new AppError("Invalid credentials",STATUS_CODE.UNAUTHORIZED);
            } else {
                return user;
            }
        } catch (error) {
            throw new AppError("Error while logging in user",STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserByEmail(email:string){
        try {
            const user= await prisma.user.findUnique({
                where:{
                    email
                }
            });
            if(!user){
                throw new AppError("User not found",STATUS_CODE.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new AppError("Error while getting user by email",STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserByEmailForRegister(email:string){
        try {
            const user= await prisma.user.findUnique({
                where:{
                    email
                }
            });
            return user;
        } catch (error) {
            throw new AppError("Error while getting user by email",STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }
}

export default  AuthRepository;