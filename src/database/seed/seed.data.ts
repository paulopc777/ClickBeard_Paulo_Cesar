import { PrismaClient } from "../../generated/prisma"

export default async function SeedDatabase() {

    const prisma = new PrismaClient();

    // Create User
    await prisma.user.create({
        data: {
            email: "user@example.com",
            name: "John Doe",
            password: "securepassword"
        }
    })

    // Create Services
    await prisma.service.createMany({
        data: [
            {
                name: "Corte de Cabelo",
                price: 20.00,
            },
            {
                name: "Barba",
                price: 15.00,
            },
            {
                name: "Sobrancelha",
                price: 25.00,
            },
            {
                name: "Hidratação",
                price: 30.00,
            }
        ]
    })

    // Create Barber
    await prisma.barber.create({
        data: {
            name: "Jane Smith",
            email: "jane@example.com",
            age: 30,
            contact_date: new Date(),
        }
    })

}

SeedDatabase()