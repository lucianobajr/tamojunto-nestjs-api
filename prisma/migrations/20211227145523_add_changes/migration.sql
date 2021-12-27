/*
  Warnings:

  - You are about to drop the `_GroupsToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroupsToUser" DROP CONSTRAINT "_GroupsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupsToUser" DROP CONSTRAINT "_GroupsToUser_B_fkey";

-- DropTable
DROP TABLE "_GroupsToUser";
