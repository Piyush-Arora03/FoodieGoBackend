"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_profile_repositiry_1 = __importDefault(require("../repository/user-profile-repositiry"));
class UserProfileService {
    userProfileRepository;
    constructor() {
        this.userProfileRepository = new user_profile_repositiry_1.default();
    }
    async getUserProfile(userId) {
        try {
            const userProfile = await this.userProfileRepository.getById(userId);
            return userProfile;
        }
        catch (error) {
            throw error;
        }
    }
    async createOrUpdateUserProfile(userId, updateData) {
        try {
            const updatedProfile = await this.userProfileRepository.createOrUpdate(userId, updateData);
            return updatedProfile;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = UserProfileService;
//# sourceMappingURL=user-profile-service.js.map