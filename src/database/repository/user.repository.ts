import { User } from "../../generated/prisma";

export default interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    create(data: {
        email: string;
        password: string;
        name: string;
    }): Promise<User>;
}