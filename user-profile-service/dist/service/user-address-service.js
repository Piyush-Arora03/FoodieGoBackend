"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_address_repository_1 = __importDefault(require("../repository/user-address-repository"));
class UserAddressService {
    userAddressRepository;
    constructor() {
        this.userAddressRepository = new user_address_repository_1.default();
    }
    async getUserAddress(userId) {
        try {
            const userAddress = await this.userAddressRepository.getById(userId);
            return userAddress;
        }
        catch (error) {
            throw error;
        }
    }
    async createUserAddress(userId, address) {
        try {
            const createdAddress = await this.userAddressRepository.create(userId, address);
            return createdAddress;
        }
        catch (error) {
            throw error;
        }
    }
    async updateUserAddress(id, address) {
        try {
            const updatedAddressResult = await this.userAddressRepository.updateAddress(id, address);
            return updatedAddressResult;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUserAddress(id) {
        try {
            const deletedAddressResult = await this.userAddressRepository.deleteAddress(id);
            return deletedAddressResult;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = UserAddressService;
//# sourceMappingURL=user-address-service.js.map