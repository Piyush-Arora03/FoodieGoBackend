import { Profile } from "../../node_modules/.prisma/user-profile-client";
import { UserProfilePayload } from "../utils/payload";
declare class UserProfileService {
    private userProfileRepository;
    constructor();
    getUserProfile(userId: string): Promise<Profile | null>;
    createOrUpdateUserProfile(userId: string, updateData: UserProfilePayload): Promise<Profile>;
}
export default UserProfileService;
//# sourceMappingURL=user-profile-service.d.ts.map