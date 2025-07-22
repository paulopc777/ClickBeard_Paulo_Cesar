import { Barber } from "../../generated/prisma";

export interface IBarberRepository {
    findAll(): Promise<Barber[]>;
    findById(id: string): Promise<Barber | null>;
    findByEmail(email: string): Promise<Barber | null>;
    create(barber: {
        name: string;
        email: string;
        password: string;
        age: number;
        contact_date?: Date;
        admin?: boolean;
    }): Promise<Barber>;
    update(id: string, barber: Partial<Barber>): Promise<Barber | null>;
    delete(id: string): Promise<boolean>;
}