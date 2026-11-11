/*
  Warnings:

  - A unique constraint covering the columns `[referenceCode]` on the table `FoodOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "FoodOrder" ADD COLUMN     "lookupCodeHash" TEXT,
ADD COLUMN     "referenceCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "FoodOrder_referenceCode_key" ON "FoodOrder"("referenceCode");
