/*
  Warnings:

  - Added the required column `password` to the `Barber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "password" TEXT NOT NULL;
