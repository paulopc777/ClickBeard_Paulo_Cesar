import { Barber } from "../../generated/prisma";
import prisma from "../prisma";
import { IBarberRepository } from "../repository/barber.repository";

export default class PrismaBarberRepository implements IBarberRepository {
    constructor() { }

    async findAll(): Promise<Barber[]> {
        return await prisma.barber.findMany();
    }

    async findById(id: string): Promise<Barber | null> {
        return await prisma.barber.findUnique({
            where: { id }
        });
    }

    async findByEmail(email: string): Promise<Barber | null> {
        return await prisma.barber.findUnique({
            where: { email }
        });
    }

    async create(barber: {
        name: string;
        email: string;
        password: string;
        age: number;
        contact_date?: Date;
        admin?: boolean;
    }): Promise<Barber> {
        return await prisma.barber.create({
            data: barber
        });
    }

    async update(id: string, barber: Partial<Barber>): Promise<Barber | null> {
        try {
            return await prisma.barber.update({
                where: { id },
                data: barber
            });
        } catch (error) {
            return null;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            await prisma.barber.delete({
                where: { id }
            });
            return true;
        } catch (error) {
            return false;
        }
    }

}