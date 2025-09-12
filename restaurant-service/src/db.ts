import { PrismaClient } from "../node_modules/.prisma/restuarant-client";

const prisma : PrismaClient = new PrismaClient();

export { prisma };