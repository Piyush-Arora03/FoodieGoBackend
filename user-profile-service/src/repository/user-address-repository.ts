import { Address } from "../../node_modules/.prisma/user-profile-client";
import {prisma} from '../db'
import { AppError } from "../utils/app-error";
import { STATUS_CODE } from "../config/status-code.config";
import { UserAddressPayload } from "../utils/payload";

class AddressRepository{
    async create(userId:string,data:UserAddressPayload) : Promise<Address>{
        try {
            const address:Address=await prisma.address.create({
                data:{
                    userId:userId,
                    street:data.street!!,
                    city:data.city!!,
                    state:data.state!!,
                    postalCode:data.postalCode!!
                }
            });
            return address;
        } catch (error) {
            throw new AppError("Error While address creation",STATUS_CODE.INTERNAL_SERVER_ERROR) 
        }
    }

    async getById(userId:string):Promise<Address[]>{
        try {
            const address:Address[]=await prisma.address.findMany({
                where:{userId}
            });
            return address;
        } catch (error) {
            throw new AppError("Error While Fetching Address",STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteAddress(id:string):Promise<Address>{
        try {
            const address : Address=await prisma.address.delete({
                where:{id}
            });
            return address;
        } catch (error) {
            throw new AppError("Error While Deleting Address",STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

    async updateAddress(id:string,data:{street?:string,city?:string,state?:string,postalCode?:string}):Promise<Address>{
        try {
            const previousAddress:Address|null=await prisma.address.findUnique({
                where:{id}
            });
            if(!previousAddress){
                throw new AppError("Address Not Found",STATUS_CODE.NOT_FOUND)
            }
            const address:Address=await prisma.address.update({
                where:{id},
                data:{
                    street:data.street??previousAddress.street,
                    city:data.city??previousAddress.city,
                    state:data.state??previousAddress.state,
                    postalCode:data.postalCode??previousAddress.postalCode
                }
            });
            return address;
        } catch (error) {
            throw new AppError("Error While Updating Address",STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }
}

export default AddressRepository;
