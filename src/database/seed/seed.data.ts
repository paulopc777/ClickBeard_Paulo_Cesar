import { PrismaClient } from "../../generated/prisma";

export default async function SeedDatabase() {
  const prisma = new PrismaClient();

  // Create User
  await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "John Doe",
      password: "securepassword",
    },
  });

  // Create Services
  await prisma.service.createMany({
    data: [
      {
        name: "Corte de Cabelo",
        price: 20.0,
      },
      {
        name: "Barba",
        price: 15.0,
      },
      {
        name: "Sobrancelha",
        price: 25.0,
      },
      {
        name: "Hidratação",
        price: 30.0,
      },
    ],
  });

  // Create Barber
  const barber = await prisma.barber.create({
    data: {
      name: "Gabriel Nascimento",
      email: "gabriel@example.com",
      age: 30,
      password: "securepassword",
      admin: true,
      contact_date: new Date(),
    },
  });

  const barber2 = await prisma.barber.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      age: 35,
      password: "securepassword",
      admin: false,
      contact_date: new Date(),
    },
  });

  // Relate Barber with Services
  const services = await prisma.service.findMany();
  await prisma.barberServices.createMany({
    data: [
      {
        barberId: barber.id,
        serviceId: services[0].id, // Corte de Cabelo
      },
      {
        barberId: barber.id,
        serviceId: services[1].id, // Barba
      },
    ],
  });

  await prisma.barberServices.createMany({
    data: [
      {
        barberId: barber2.id,
        serviceId: services[2].id, // Sobrancelha
      },
      {
        barberId: barber2.id,
        serviceId: services[3].id, // Hidratação
      },
    ],
  });
  // WorkingSchedule
  await prisma.workingSchedule.createMany({
    data: [
      {
        dayOfWeek: "MONDAY",
        dayOfWeek_number: 1,
        startTime: "08:00",
        endTime: "18:00",
        lunchStart: "12:00",
        lunchEnd: "13:00",
      },
      {
        dayOfWeek: "TUESDAY",
        dayOfWeek_number: 2,
        startTime: "08:00",
        endTime: "18:00",
        lunchStart: "12:00",
        lunchEnd: "13:00",
      },
      {
        dayOfWeek: "WEDNESDAY",
        dayOfWeek_number: 3,
        startTime: "08:00",
        endTime: "18:00",
        lunchStart: "12:00",
        lunchEnd: "13:00",
      },
      {
        dayOfWeek: "THURSDAY",
        startTime: "08:00",
        dayOfWeek_number: 4,
        endTime: "18:00",
        lunchStart: "12:00",
        lunchEnd: "13:00",
      },
      {
        dayOfWeek: "FRIDAY",
        dayOfWeek_number: 5,
        startTime: "08:00",
        endTime: "18:00",
        lunchStart: "13:00",
        lunchEnd: "14:00",
      },
      {
        dayOfWeek: "SATURDAY",
        dayOfWeek_number: 6,
        startTime: "08:00",
        endTime: "18:00",
        lunchStart: "12:00",
        lunchEnd: "13:00",
      }
    ],
  });

  const now = new Date();
  //   Create Schedules
  await prisma.schedules.createMany({
    data: [
      {
        barberId: barber.id,
        // Hoje às 15:00
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0, 0, 0),
        // endTime is 30 minutes later
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 30, 0, 0),
        serviceId: services[0].id,
      },
      {
        barberId: barber.id,
         startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0, 0, 0),
        // endTime is 30 minutes later
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 30, 0, 0),
        serviceId: services[1].id,
      },
      {
        barberId: barber2.id,
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0, 0),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 30, 0, 0),
        serviceId: services[2].id,
      },
      {
        barberId: barber2.id,
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0, 0),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 30, 0, 0),
        serviceId: services[3].id,
      },
    ],
  });
}

SeedDatabase();
