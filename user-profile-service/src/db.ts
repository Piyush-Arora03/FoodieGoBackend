import { PrismaClient } from "../node_modules/.prisma/user-profile-client";

const prisma : PrismaClient= new PrismaClient();

export { prisma };