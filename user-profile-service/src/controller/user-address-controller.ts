import UserAddressService from "../service/user-address-service";
import { Request, Response } from "express";
import { STATUS_CODE } from "../config/status-code.config";
import { AppError } from "../utils/app-error";
import { UserAddressPayload } from "../utils/payload";
import {Address} from "../../node_modules/.prisma/user-profile-client"

class UserAddressController{
    private userAddressService: UserAddressService;
    constructor(){
        this.userAddressService = new UserAddressService();
    }

    async getUserAddress(req: Request, res: Response){
        try {
            const userId : string= req.user!.id;
            const userAddress :Address[]|null= await this.userAddressService.getUserAddress(userId);
            res.status(STATUS_CODE.OK).json({
                data:userAddress,
                success:true,
                message:"User Address fetched successfully"
            })
        } catch (error) {
            if(error instanceof AppError){
                return res.status(error.httpCode).json({
                    success:false,
                    message:error.message
                });
            }
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:"Something went wrong"
            });
        }
    }

    async createUserAddress(req: Request, res: Response){
        try {
            const userId : string= req.user!.id;
            const payload : UserAddressPayload= req.body;
            const address= await this.userAddressService.createUserAddress(userId,payload);
            res.status(STATUS_CODE.OK).json({
                data:address,
                success:true,
                message:"User Address Created successfully"
            })
        }catch(error){
            if(error instanceof AppError){
                return res.status(error.httpCode).json({
                    success:false,
                    message:error.message
                });
            }
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:"Something went wrong"
            });
        }
    }

    async updateUserAddress(req: Request, res: Response){
       try {
            if(!req.params.addressId){
                throw new AppError("Address Id is required",STATUS_CODE.BAD_REQUEST);
            }
            const addressId : string= req.params.addressId;
            const payload : UserAddressPayload= req.body; 
            const address= await this.userAddressService.updateUserAddress(addressId,payload);
            res.status(STATUS_CODE.OK).json({
                data:address,
                success:true,
                message:"User Address Updated successfully"
            })
        }catch(error){
            if(error instanceof AppError){
                return res.status(error.httpCode).json({
                    success:false,
                    message:error.message
                });
            }
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:"Something went wrong"
            });
        }
    }
    
    async deleteUserAddress(req: Request, res: Response){
        try {
            const addressId : string= req.params.addressId!!;
            const address= await this.userAddressService.deleteUserAddress(addressId);
            res.status(STATUS_CODE.OK).json({
                data:address,
                success:true,
                message:"User Address Deleted successfully"
            })
        }catch(error){
            if(error instanceof AppError){
                return res.status(error.httpCode).json({
                    success:false,
                    message:error.message
                });
            }
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:"Something went wrong"
            });
        }
    }
}

export default UserAddressController