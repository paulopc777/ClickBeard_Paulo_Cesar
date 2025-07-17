import IUserRepository from "../../../database/repository/user.repository";

interface RegisterClientData {
    user_repository: IUserRepository;
    data: {
        email: string;
        password: string;
        name: string;
    }
}

export default async function RegisterClient({ user_repository, data }: RegisterClientData) {
    const { email, password, name } = data;

    const existingUser = await user_repository.findByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }

    // Create new user
    const newUser = await user_repository.create({
        email,
        password,
        name
    });

    return {
        user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name
        }
    }
}