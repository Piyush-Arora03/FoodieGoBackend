import { Role,User } from "../../node_modules/.prisma/auth-client";
import { prisma } from "../db";
import { AppError } from "../utils/app-error";
import {STATUS_CODE} from '../config/status-code.config';


class AuthRepository {
    async registerUser(email:string,password:string,role:Role):Promise<User>{
        try{ 
            const user= await prisma.user.create({
                data:{
                    email,
                    password,
                    roles:{
                        create:{
                            role
                        }
                    }
                }
            });
            return user;
        } catch (error) {
            throw new AppError("Error creating user",STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserWithRoleByEmail(email:string): Promise<(User & { roles: { role: Role }[] }) | null> {
        try {
          const user= await prisma.user.findUnique({
            where:{email:email},
            include:{
                roles:{
                    select:{
                        role:true
                    }
                }
            }
          });  
          return user;
        } catch (error) {
            throw new AppError("Error while getting user by email with roles",STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async addRoleToUser(userId:string,role:Role) : Promise<User | null>{
        try {
            await prisma.roleProfile.create({
                data:{
                    userId,
                    role
                }
            });
            const user= await prisma.user.findUnique({
                where:{id:userId},
                include:{roles:true}
            });
            return user;
        } catch (error) {
            throw new AppError("Error while adding role to user",STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }


    async getUserByIdWithRoles(id:string): Promise<(User & { roles: { role: Role }[] }) | null> {
        try {
            const user= await prisma.user.findUnique({
                where:{id:id},
                include:{
                    roles:{
                        select:{
                            role:true
                        }
                    }
                }
            });
            return user;
        } catch (error) {
            throw new AppError("Error while getting user by id with roles",STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }
}

export default  AuthRepository;