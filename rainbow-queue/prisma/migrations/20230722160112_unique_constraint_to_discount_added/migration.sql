/*
  Warnings:

  - A unique constraint covering the columns `[discountCode]` on the table `discounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "discounts_discountCode_key" ON "discounts"("discountCode");
