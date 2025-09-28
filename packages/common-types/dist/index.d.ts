export declare enum Role {
    CUSTOMER = "CUSTOMER",
    RESTAURANT = "RESTAURANT",
    RIDER = "RIDER",
    ADMIN = "ADMIN"
}
export interface JwtPayload {
    id: string;
    role: Role;
}
export interface MenuItem {
    itemId: string;
    quantity: string;
    name: string;
    price: number;
    subtotal: number;
}
//# sourceMappingURL=index.d.ts.map