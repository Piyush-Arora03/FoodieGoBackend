import { Profile } from "@prisma/client";
declare class UserProfileService {
    private userProfileRepository;
    constructor();
    getUserProfile(userId: string): Promise<Profile | null>;
    createOrUpdateUserProfile(userId: string, updateData: any): Promise<Profile>;
}
export default UserProfileService;
//# sourceMappingURL=user-profile-service.d.ts.map