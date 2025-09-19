import { STATUS_CODE } from "../config/status-code.config";
import { AppError } from "../utils/app-error";
import { Role } from "../../node_modules/.prisma/auth-client";

export const roleMapper = (packageName: string): Role => {
    if (packageName.endsWith(".customer")) {
        return Role.CUSTOMER;
    }
    if (packageName.endsWith(".admin")) {
        return Role.ADMIN;
    }
    if (packageName.endsWith(".restaurant")) {
        return Role.RESTAURANT;
    }
    if (packageName.endsWith(".rider")) {
        return Role.RIDER;
    }
    throw new AppError("Invalid package name for role mapping", STATUS_CODE.BAD_REQUEST);
}