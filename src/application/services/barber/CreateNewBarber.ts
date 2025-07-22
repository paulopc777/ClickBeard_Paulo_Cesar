import { IBarberRepository } from "../../../database/repository/barber.repository";

export default async function CreateNewBarber({ name, age, contact_date, email, password, admin, barber_repository }: {
    name: string;
    age: number;
    contact_date: Date;
    email: string;
    password: string;
    barber_repository: IBarberRepository;
    admin?: boolean;
}) {

    const existingBarber = await barber_repository.findByEmail(email);
    if (existingBarber) {
        throw new Error("Barber with this email already exists");
    }

    const newBarber = await barber_repository.create({
        name,
        age,
        contact_date,
        email,
        password: password,
        admin: admin
    });

    return {
        message: "Barber created successfully",
        barber: newBarber
    };

}