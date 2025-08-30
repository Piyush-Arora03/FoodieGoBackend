/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "role";

-- CreateTable
CREATE TABLE "public"."RoleProfile" (
    "id" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoleProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoleProfile_userId_key" ON "public"."RoleProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RoleProfile_userId_role_key" ON "public"."RoleProfile"("userId", "role");

-- AddForeignKey
ALTER TABLE "public"."RoleProfile" ADD CONSTRAINT "RoleProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
