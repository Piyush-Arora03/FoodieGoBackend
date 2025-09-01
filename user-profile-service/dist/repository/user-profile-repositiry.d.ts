import { Profile } from "@prisma/client";
declare class UserProfileRepository {
    createOrUpdate(userId: string, data: {
        firstName: string;
        lastName: string;
        phone?: string;
    }): Promise<Profile>;
    getById(userId: string): Promise<Profile | null>;
}
export default UserProfileRepository;
//# sourceMappingURL=user-profile-repositiry.d.ts.map