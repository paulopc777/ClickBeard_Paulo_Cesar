import { FastifyReply, FastifyRequest } from "fastify";
import ClientJWT from "../../types/client.jwt";
import PrismaBarberRepository from "../../database/model/barber.model";

export default async function AdminMiddleware(request: FastifyRequest, reply: FastifyReply) {
    try {
        const user = await request.jwtVerify() as ClientJWT;
        console.log(user)

        if (!user || !user.barber) {
            return reply.status(403).send({ error: 'Forbidden' });
        }

        const find = await new PrismaBarberRepository().findById(user.id);
        console.log(find)
        if (!find || !find.email) {
            return reply.status(404).send({ error: 'Forbidden' });
        }

    } catch (err) {
        reply.send(err);
    }

}