/*
  Warnings:

  - You are about to drop the column `discriprion` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "discriprion",
ADD COLUMN     "discription" TEXT;
