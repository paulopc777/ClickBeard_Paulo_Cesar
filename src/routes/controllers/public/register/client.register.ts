import { FastifyInstance } from "fastify";
import PrismaUserRepository from "../../../../database/model/user.model";
import RegisterClient from "../../../../application/use-cases/register/RegisterClient";
import { RequestRegisterClientDto, ResponseRegisterClientDto } from "../../../../application/dto/register.client.dto";

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

        return reply.send({
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    });

}