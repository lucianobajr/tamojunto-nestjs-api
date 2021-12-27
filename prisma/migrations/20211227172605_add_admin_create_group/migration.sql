/*
  Warnings:

  - Added the required column `adminCreateUserId` to the `Groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "adminCreateUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_adminCreateUserId_fkey" FOREIGN KEY ("adminCreateUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
