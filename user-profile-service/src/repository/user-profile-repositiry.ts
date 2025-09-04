import { Profile } from "../../node_modules/.prisma/user-profile-client";
import { prisma } from '../db'
import { AppError } from "../utils/app-error";
import { STATUS_CODE } from "../config/status-code.config";

class UserProfileRepository {
    async createOrUpdate(userId: string, data: { firstName?: string, lastName?: string, phone?: string }): Promise<Profile> {
        try {
            const profile: Profile = await prisma.profile.upsert({
                where: { userId },
                update: {
                    firstName: data.firstName ?? null,
                    lastName: data.lastName ?? null,
                    phone: data.phone ?? null
                },
                create: {
                    userId: userId,
                    firstName: data.firstName ?? null,
                    lastName: data.lastName ?? null,
                    phone: data.phone ?? null
                }
            });
            return profile
        } catch (error) {
            throw new AppError("Error While Profile Updation", STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

    async getById(userId: string): Promise<Profile | null> {
        try {
            console.log("Fetching Profile", userId);
            const profile: Profile | null = await prisma.profile.findUnique({
                where: { userId }
            });;
            console.log("Fetched Profile", profile);
            return profile;
        } catch (error) {
            throw new AppError("Error While Fetching Profile", STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }
}

export default UserProfileRepository
