import { FastifyInstance } from "fastify";
import { RequestAuthClientDto, ResponseAuthClientDto } from "../../../../application/dto/auth.client.dto";
import { Static } from "@fastify/type-provider-typebox";
import "@fastify/jwt"
import PrismaUserRepository from "../../../../database/model/user.model";
import ClientLogin from "../../../../application/services/auth/ClientLogin";


export default async function AuthClient(app: FastifyInstance) {

    app.post<{ Body: Static<typeof RequestAuthClientDto> }>('/', {
        schema: {
            body: RequestAuthClientDto,
            response: {
                200: ResponseAuthClientDto
            }
        }
    }, async (request, reply) => {
        const { email, password } = request.body;

        const user_repository = new PrismaUserRepository();
        const { user } = await ClientLogin({ user_repository, data: { email, password } });
        const token = app.jwt.sign({ email });

        return reply.send({ token, user });
    });

}