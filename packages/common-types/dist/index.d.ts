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
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role[];
}
//# sourceMappingURL=index.d.ts.map