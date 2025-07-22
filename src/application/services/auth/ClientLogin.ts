import IUserRepository from "../../../database/repository/user.repository";

interface DataLogin {
    user_repository: IUserRepository;
    data: {
        email: string;
        password: string;
    }
}

interface ClientLoginResponse {
    user: {
        id: string;
        email: string;
        name: string;
        barber: boolean;
    }
}

export default async function ClientLogin({ user_repository, data }: DataLogin): Promise<ClientLoginResponse> {

    const { email, password } = data;

    // Check if user exists
    const user = await user_repository.findByEmail(email);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.password !== password || !user.password) {
        throw new Error("Invalid User");
    }

    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            barber: false
        }
    }
}