import { User } from "../../generated/prisma";
import prisma from "../prisma";
import IUserRepository from "../repository/user.repository";

export default class PrismaUserRepository implements IUserRepository {
    constructor() { }

    async findByEmail(email: string): Promise<User | null> {
        const data = await prisma.user.findUnique({
            where: { email }
        });
        return data;
    }

    async create(data: { email: string; password: string; name: string }): Promise<User> {
        const newUser = await prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name
            }
        });
        return newUser;
    }
}