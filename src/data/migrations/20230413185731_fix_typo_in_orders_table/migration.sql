/*
  Warnings:

  - You are about to drop the column `recievedAmount` on the `orders` table. All the data in the column will be lost.
  - Added the required column `receivedAmount` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "recievedAmount",
ADD COLUMN     "receivedAmount" DECIMAL(65,30) NOT NULL;
