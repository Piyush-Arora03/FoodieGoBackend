import { PrismaClient } from "../node_modules/.prisma/auth-client";

const prisma : PrismaClient = new PrismaClient();

export { prisma };