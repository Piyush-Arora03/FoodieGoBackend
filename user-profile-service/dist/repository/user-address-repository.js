"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const app_error_1 = require("../utils/app-error");
const status_code_config_1 = require("../config/status-code.config");
class AddressRepository {
    async create(userId, data) {
        try {
            const address = await db_1.prisma.address.create({
                data: {
                    userId: userId,
                    street: data.street,
                    city: data.city,
                    state: data.state,
                    postalCode: data.postalCode
                }
            });
            return address;
        }
        catch (error) {
            throw new app_error_1.AppError("Error While address creation", status_code_config_1.STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(userId) {
        try {
            const address = await db_1.prisma.address.findMany({
                where: { userId }
            });
            return address;
        }
        catch (error) {
            throw new app_error_1.AppError("Error While Fetching Address", status_code_config_1.STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteAddress(id) {
        try {
            const address = await db_1.prisma.address.delete({
                where: { id }
            });
            return address;
        }
        catch (error) {
            throw new app_error_1.AppError("Error While Deleting Address", status_code_config_1.STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAddress(id, data) {
        try {
            const previousAddress = await db_1.prisma.address.findUnique({
                where: { id }
            });
            if (!previousAddress) {
                throw new app_error_1.AppError("Address Not Found", status_code_config_1.STATUS_CODE.NOT_FOUND);
            }
            const address = await db_1.prisma.address.update({
                where: { id },
                data: {
                    street: data.street ?? previousAddress.street,
                    city: data.city ?? previousAddress.city,
                    state: data.state ?? previousAddress.state,
                    postalCode: data.postalCode ?? previousAddress.postalCode
                }
            });
            return address;
        }
        catch (error) {
            throw new app_error_1.AppError("Error While Updating Address", status_code_config_1.STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.default = AddressRepository;
//# sourceMappingURL=user-address-repository.js.map