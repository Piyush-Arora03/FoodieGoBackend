import { STATUS_CODE } from "../config/status-code.config";
import { AppError } from "../utils/app-error";
import { Role } from "../../node_modules/.prisma/auth-client";

export const roleMapper= (packageName:string)=>{
    if(packageName.endsWith(".customer")){
        return Role.CUSTOMER;
    }
    else if(packageName.endsWith(".admin")){
        return Role.ADMIN;
    }
    else if(packageName.endsWith(".restaurant")){
        return Role.RESTAURANT;
    }
    else if(packageName.endsWith(".rider")){
        return Role.RIDER;
    }
    else Role.CUSTOMER

    throw new AppError("Invalid package name for role mapping", STATUS_CODE.BAD_REQUEST);
} 