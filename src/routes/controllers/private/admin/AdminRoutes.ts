import { FastifyInstance } from "fastify";
import AdminMiddleware from "../../../middleware/auth.admin.middleware";
import BarberRoute from "./barber/BarberRoute";
import AdminServiceRoute from "./service/ServiceRoute";
import AdminSchedulesRoute from "./schedules/AdminSchedules";

export default async function AdminRoutes(app: FastifyInstance) {

    app.addHook("onRequest", AdminMiddleware);

    app.register(BarberRoute, { prefix: "/barbers" });
    app.register(AdminServiceRoute, { prefix: "/services" });
    app.register(AdminSchedulesRoute, { prefix: "/schedules" });
}