import { FastifyReply, FastifyRequest } from "fastify";

export default async function ClientMiddleware(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
}
