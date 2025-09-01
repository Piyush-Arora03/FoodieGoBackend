import AddressRepository from "../repository/user-address-repository";

interface AddressData{
    street?:string
    city?:string
    state?:string
    postalCode?:string
}

class UserAddressService{
    private userAddressRepository: AddressRepository;

    constructor(){
        this.userAddressRepository = new AddressRepository();
    }

    async getUserAddress(userId: string): Promise<any>{
        try{
            const userAddress = await this.userAddressRepository.getById(userId);
            return userAddress;
        }catch(error){
            throw error;
        }
    }

    async createUserAddress(userId: string, address: any): Promise<any>{
        try{
            const createdAddress = await this.userAddressRepository.create(userId, address);
            return createdAddress;
        }catch(error){
            throw error;
        }
    }

    async updateUserAddress(id:string, address: AddressData): Promise<any>{
        try{
            const updatedAddressResult = await this.userAddressRepository.updateAddress(id,address);
            return updatedAddressResult;
        }catch(error){
            throw error;
        }
    }

    async deleteUserAddress(id:string): Promise<any>{
        try{
            const deletedAddressResult = await this.userAddressRepository.deleteAddress(id);
            return deletedAddressResult;
        }catch(error){
            throw error;
        }
    }
}

export default UserAddressService;