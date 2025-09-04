import { Address } from "../../node_modules/.prisma/user-profile-client";
import { UserAddressPayload } from "../utils/payload";
declare class UserAddressService {
    private userAddressRepository;
    constructor();
    getUserAddress(userId: string): Promise<Address[] | null>;
    createUserAddress(userId: string, address: UserAddressPayload): Promise<Address>;
    updateUserAddress(id: string, address: UserAddressPayload): Promise<Address>;
    deleteUserAddress(id: string): Promise<Address>;
}
export default UserAddressService;
//# sourceMappingURL=user-address-service.d.ts.map