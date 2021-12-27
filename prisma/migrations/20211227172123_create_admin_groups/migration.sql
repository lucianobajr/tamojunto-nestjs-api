-- CreateTable
CREATE TABLE "admin_groups" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_groups_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "admin_groups" ADD CONSTRAINT "admin_groups_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_groups" ADD CONSTRAINT "admin_groups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
