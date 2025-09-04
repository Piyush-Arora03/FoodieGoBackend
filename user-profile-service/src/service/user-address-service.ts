import { Address } from "../../node_modules/.prisma/user-profile-client";
import AddressRepository from "../repository/user-address-repository";
import { UserAddressPayload } from "../utils/payload";

class UserAddressService{
    private userAddressRepository: AddressRepository;

    constructor(){
        this.userAddressRepository = new AddressRepository();
    }

    async getUserAddress(userId: string): Promise<Address[]|null>{
        try{
            const userAddress:Address[]|null = await this.userAddressRepository.getById(userId);
            return userAddress;
        }catch(error){
            throw error;
        }
    }

    async createUserAddress(userId: string, address: UserAddressPayload): Promise<Address>{
        try{
            const createdAddress:Address = await this.userAddressRepository.create(userId, address);
            return createdAddress;
        }catch(error){
            throw error;
        }
    }

    async updateUserAddress(id:string, address: UserAddressPayload): Promise<Address>{
        try{
            const updatedAddressResult: Address = await this.userAddressRepository.updateAddress(id,address);
            return updatedAddressResult;
        }catch(error){
            throw error;
        }
    }

    async deleteUserAddress(id:string): Promise<Address>{
        try{
            const deletedAddressResult : Address= await this.userAddressRepository.deleteAddress(id);
            return deletedAddressResult;
        }catch(error){
            throw error;
        }
    }
}

export default UserAddressService;