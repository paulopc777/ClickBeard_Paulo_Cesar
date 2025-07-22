/*
  Warnings:

  - You are about to drop the column `companyId` on the `WorkingSchedule` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "WorkingSchedule_companyId_dayOfWeek_key";

-- AlterTable
ALTER TABLE "WorkingSchedule" DROP COLUMN "companyId";
