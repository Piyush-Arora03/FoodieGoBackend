interface AddressData {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
}
declare class UserAddressService {
    private userAddressRepository;
    constructor();
    getUserAddress(userId: string): Promise<any>;
    createUserAddress(userId: string, address: any): Promise<any>;
    updateUserAddress(id: string, address: AddressData): Promise<any>;
    deleteUserAddress(id: string): Promise<any>;
}
export default UserAddressService;
//# sourceMappingURL=user-address-service.d.ts.map