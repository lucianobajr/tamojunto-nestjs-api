/*
  Warnings:

  - Added the required column `membersId` to the `Groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_id_fkey";

-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "membersId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Groups" ADD FOREIGN KEY ("membersId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
