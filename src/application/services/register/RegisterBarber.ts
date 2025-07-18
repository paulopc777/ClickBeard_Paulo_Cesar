import { IBarberRepository } from "../../../database/repository/barber.repository";

interface RegisterBarberData {
    barber_repository: IBarberRepository;
    data: {
        name: string,
        email: string,
        password: string,
        age: number,
        contact_date?: Date,
    }
}

export default async function RegisterBarber({ barber_repository, data }: RegisterBarberData) {
    if (!data.name || !data.email || !data.password || !data.age) {
        throw new Error("All fields are required");
    }

    const existingBarber = await barber_repository.findById(data.email);
    if (existingBarber) {
        throw new Error("Barber already exists");
    }

    const response = await barber_repository.create(data)

    if (!response) {
        throw new Error("Failed to register barber");
    }

    return response;
}