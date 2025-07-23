import { PrismaClient } from "../../generated/prisma";

export default async function SeedDatabase() {
    const prisma = new PrismaClient();

    const barber = await prisma.barber.findFirst({})

    const user = await prisma.user.findFirst()

    const services = await prisma.service.findMany();

    if (!barber || !user) {
        console.error("Barber or User not found. Please ensure the database is seeded with initial data.");
        return;
    }

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
                userId: user.id
            },
            {
                barberId: barber.id,
                startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0, 0, 0),
                // endTime is 30 minutes later
                endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 30, 0, 0),
                serviceId: services[1].id,
                userId: user.id
            },
            {
                barberId: barber.id,
                startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0, 0),
                endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 30, 0, 0),
                serviceId: services[2].id,
                userId: user.id
            },
            {
                barberId: barber.id,
                startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0, 0),
                endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 30, 0, 0),
                serviceId: services[3].id,
                userId: user.id
            },
        ],
    });
}

SeedDatabase();
