"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const app_error_1 = require("../utils/app-error");
const status_code_config_1 = require("../config/status-code.config");
class UserProfileRepository {
    async createOrUpdate(userId, data) {
        try {
            console.log("Updating Profile", data);
            const profile = await db_1.prisma.profile.upsert({
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
            return profile;
        }
        catch (error) {
            throw new app_error_1.AppError("Error While Profile Updation", status_code_config_1.STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(userId) {
        try {
            console.log("Fetching Profile", userId);
            const profile = await db_1.prisma.profile.findUnique({
                where: { userId }
            });
            ;
            console.log("Fetched Profile", profile);
            return profile;
        }
        catch (error) {
            throw new app_error_1.AppError("Error While Fetching Profile", status_code_config_1.STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.default = UserProfileRepository;
//# sourceMappingURL=user-profile-repositiry.js.map