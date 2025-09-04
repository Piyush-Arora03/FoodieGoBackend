import { Address } from "../../node_modules/.prisma/user-profile-client";
import { UserAddressPayload } from "../utils/payload";
declare class AddressRepository {
    create(userId: string, data: UserAddressPayload): Promise<Address>;
    getById(userId: string): Promise<Address[]>;
    deleteAddress(id: string): Promise<Address>;
    updateAddress(id: string, data: {
        street?: string;
        city?: string;
        state?: string;
        postalCode?: string;
    }): Promise<Address>;
}
export default AddressRepository;
//# sourceMappingURL=user-address-repository.d.ts.map