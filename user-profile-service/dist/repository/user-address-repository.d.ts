import { Address } from "@prisma/client";
declare class AddressRepository {
    create(userId: string, data: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
    }): Promise<Address>;
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