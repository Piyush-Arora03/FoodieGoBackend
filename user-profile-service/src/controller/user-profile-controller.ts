import UserProfileService from "../service/user-profile-service";
import { Request, Response, NextFunction } from "express";
import { STATUS_CODE } from "../config/status-code.config";
import { AppError } from "../utils/app-error";
import { UserProfilePayload } from "../utils/payload";
import { Profile } from "../../node_modules/.prisma/user-profile-client"

class UserProfileController {
    private userProfileService: UserProfileService;
    constructor() {
        this.userProfileService = new UserProfileService();
    }

    async getUserProfile(req: Request, res: Response) {
        try {
            const userId: string = req.user!.id;
            console.log("id after protect", userId);
            // console.log(await this.userProfileService.getUserProfile(userId));
            const userProfile: Profile | null = await this.userProfileService.getUserProfile(userId);
            console.log("userProfile", userProfile);
            res.status(STATUS_CODE.OK).json({
                data: userProfile,
                success: true,
                message: "User Profile fetched successfully"
            })
        } catch (error) {
            console.log("error ->", error);
            if (error instanceof AppError) {
                return res.status(error.httpCode).json({
                    success: false,
                    message: error.message
                });
            }
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Something went wrong"
            });
        }
    }

    async createOrUpdateUserProfile(req: Request, res: Response) {
        try {
            const userId: string = req.user!.id;
            const userProfileData: UserProfilePayload = req.body;
            const userProfile: Profile | null = await this.userProfileService.createOrUpdateUserProfile(userId, userProfileData);
            res.status(STATUS_CODE.OK).json({
                data: userProfile,
                success: true,
                message: "User Profile created successfully"
            });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.httpCode).json({
                    success: false,
                    message: error.message
                });
            }
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Something went wrong"
            });
        }
    }
}

export default UserProfileController