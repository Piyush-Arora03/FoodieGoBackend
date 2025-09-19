-- CreateEnum
CREATE TYPE "order"."OrderStatus" AS ENUM ('PENDING', 'ACCEPTED_BY_RESTAURANT', 'PREPARING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "order"."Order" (
    "id" TEXT NOT NULL,
    "status" "order"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order"."OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "menuItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Order_restaurantId_userId_idx" ON "order"."Order"("restaurantId", "userId");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_menuItemId_idx" ON "order"."OrderItem"("orderId", "menuItemId");

-- AddForeignKey
ALTER TABLE "order"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
