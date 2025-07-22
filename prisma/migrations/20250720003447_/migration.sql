/*
  Warnings:

  - Added the required column `dayOfWeek_number` to the `WorkingSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkingSchedule" ADD COLUMN     "dayOfWeek_number" INTEGER NOT NULL;
