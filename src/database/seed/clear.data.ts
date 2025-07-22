import { PrismaClient } from "../../generated/prisma";
import prisma from "../prisma";

async function ClearDatabase() {
  const prisma = new PrismaClient();
  // Clear any other related tables if necessary
  await prisma.schedules.deleteMany();
  // Clear BarberServices
  await prisma.barberServices.deleteMany();

  // Clear Barbers
  await prisma.barber.deleteMany();

  // Clear Services
  await prisma.service.deleteMany();

  // Clear Users
  await prisma.user.deleteMany();

  await prisma.workingSchedule.deleteMany();

  console.log("Database cleared successfully.");
}

ClearDatabase()
  .catch((e) => {
    console.error("Error clearing database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
