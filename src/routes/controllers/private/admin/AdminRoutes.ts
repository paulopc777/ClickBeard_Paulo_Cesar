import { FastifyInstance } from "fastify";
import AdminMiddleware from "../../../middleware/auth.admin.middleware";
import BarberRoute from "./barber/BarberRoute";

export default async function AdminRoutes(app: FastifyInstance) {

    app.addHook("onRequest", AdminMiddleware);

    app.register(BarberRoute, { prefix: "/barbers" });

}