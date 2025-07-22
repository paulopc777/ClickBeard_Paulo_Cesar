import { Barber } from "../../../generated/prisma";
import { IBarberRepository } from "../../../database/repository/barber.repository";

interface UpdateBarberRequest {
    id: string;
    name?: string;
    age?: number;
    contact_date?: Date;
    email?: string;
    password?: string;
    admin?: boolean;
    avatar?: string;
    barber_repository: IBarberRepository;
}

export default async function UpdateBarber({
    id,
    name,
    age,
    contact_date,
    email,
    password,
    admin,
    avatar,
    barber_repository
}: UpdateBarberRequest): Promise<Barber | null> {

    const existingBarber = await barber_repository.findById(id);
    if (!existingBarber) {
        throw new Error("Barber not found");
    }

    if (email && email !== existingBarber.email) {
        const barberWithEmail = await barber_repository.findByEmail(email);
        if (barberWithEmail) {
            throw new Error("Email already exists");
        }
    }

    const updateData: Partial<Barber> = {};

    if (name !== undefined) updateData.name = name;
    if (age !== undefined) updateData.age = age;
    if (contact_date !== undefined) updateData.contact_date = contact_date;
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = password;
    if (admin !== undefined) updateData.admin = admin;
    if (avatar !== undefined) updateData.avatar = avatar;

    return await barber_repository.update(id, updateData as Barber);
}