import { FastifyInstance } from "fastify";
import ClientMiddleware from "../../../middleware/auth.client.middleware";
import { ClientScheduleRoute } from "../../public/schedule/schedule.route";

export default async function ClientRoutes(app: FastifyInstance) {

    app.addHook("onRequest", ClientMiddleware);

    app.get('/test', (req, res) => {
        res.send({ message: "This is a private route for clients" });
    })

    app.register(ClientScheduleRoute, {
        prefix: "/schedule"
    })

}