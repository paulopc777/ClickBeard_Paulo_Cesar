import { FastifyInstance } from "fastify";
import PrismaUserRepository from "../../../../database/model/user.model";
import RegisterClient from "../../../../application/services/register/RegisterClient";
import { RequestRegisterClientDto, ResponseRegisterClientDto } from "../../../../application/dto/register.client.dto";
import { b } from "vitest/dist/chunks/suite.d.FvehnV49";

export default async function ClientRegister(app: FastifyInstance) {

    app.post('/', {
        schema: {
            body: RequestRegisterClientDto,
            response: {
                200: ResponseRegisterClientDto
            }
        }
    }, async (request, reply) => {

        const { email, password, name } = request.body as { email: string; password: string; name: string };

        const repository = new PrismaUserRepository();


        const { user } = await RegisterClient({
            user_repository: repository,
            data: { email, password, name }
        });

        const token = app.jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            barber: false
        });

        return reply.send({
            token:token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                barber: false
            }
        });
    });

}