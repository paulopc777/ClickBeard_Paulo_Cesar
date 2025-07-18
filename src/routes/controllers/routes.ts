import { FastifyInstance } from "fastify";
import AuthClient from "./public/auth/auth.client";
import ClientRegister from "./public/register/client.register";
import CompanyAuth from "./public/auth/auth.company";
import ClientRoutes from "./private/client/ClientRoutes";

export default function Routes(app: FastifyInstance) {
    // Public
    app.register(AuthClient, {
        prefix: '/login'
    });

    app.register(ClientRegister, {
        prefix: '/register'
    });

    app.register(CompanyAuth, {
        prefix: '/company/login'
    })
    // Private
    app.register(ClientRoutes, {
        prefix: '/client'
    })
}
