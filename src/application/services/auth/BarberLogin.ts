import { IBarberRepository } from "../../../database/repository/barber.repository";

interface BarberLoginData {
    barber_repository: IBarberRepository;
    data: {
        email: string;
        password: string;
    }
}

export default async function BarberLogin({ barber_repository, data }: BarberLoginData) {

    const { email, password } = data;

    // Find barber by email
    const barber = await barber_repository.findByEmail(email);

    if (!barber || barber.password !== password) {
        throw new Error("Barber not found");
    }

    return {
        barber: {
            id: barber.id,
            name: barber.name,
            email: barber.email,
            age: barber.age,
            contact_date: barber.contact_date
        }
    }
}