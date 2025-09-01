import { Profile } from "@prisma/client";
import UserProfileRepository from "../repository/user-profile-repositiry";

class UserProfileService{
    private userProfileRepository: UserProfileRepository;
    constructor(){
        this.userProfileRepository = new UserProfileRepository();
    }

    async getUserProfile(userId: string): Promise<Profile | null>{
        try{
            const userProfile = await this.userProfileRepository.getById(userId);
            return userProfile;
        }catch(error){
            throw error;
        }
    }

    async createOrUpdateUserProfile(userId: string, updateData: any): Promise<Profile>{
        try{
            const updatedProfile = await this.userProfileRepository.createOrUpdate(userId, updateData);
            return updatedProfile;
        }catch(error){
            throw error;
        }
    }

}

export default UserProfileService;