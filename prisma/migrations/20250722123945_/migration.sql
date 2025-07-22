/*
  Warnings:

  - Added the required column `userId` to the `Schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedules" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
