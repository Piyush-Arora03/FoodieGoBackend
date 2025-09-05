import { Profile } from "../../node_modules/.prisma/user-profile-client";
import UserProfileRepository from "../repository/user-profile-repositiry";
import { UserProfilePayload } from "../utils/payload";

class UserProfileService {
    private userProfileRepository: UserProfileRepository;
    constructor() {
        this.userProfileRepository = new UserProfileRepository();
    }

    async getUserProfile(userId: string): Promise<Profile | null> {
        try {
            console.log("calling get user profile", userId);
            const userProfile = await this.userProfileRepository.getById(userId);
            return userProfile;
        } catch (error) {
            throw error;
        }
    }

    async createOrUpdateUserProfile(userId: string, updateData: UserProfilePayload): Promise<Profile> {
        try {
            const previousProfile: Profile | null = await this.getUserProfile(userId);
            let previousData: UserProfilePayload = {
                firstName: "",
                lastName: "",
                phone: ""
            };
            if (previousProfile) {
                previousData = {
                    firstName: previousProfile.firstName ?? "",
                    lastName: previousProfile.lastName ?? "",
                    phone: previousProfile.phone ?? ""
                };
            }
            const updatedProfile = await this.userProfileRepository.createOrUpdate(userId, updateData, previousData);
            return updatedProfile;
        } catch (error) {
            throw error;
        }
    }

}

export default UserProfileService;