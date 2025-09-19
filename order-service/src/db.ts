import { PrismaClient } from "../node_modules/.prisma/order-client";

const prisma : PrismaClient = new PrismaClient();

export { prisma };