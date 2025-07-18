import { FastifyInstance } from "fastify";
import { RequestAuthClientDto, ResponseAuthClientDto } from "../../../../application/dto/auth.client.dto";
import { Static } from "@fastify/type-provider-typebox";
import BarberLogin from "../../../../application/services/auth/BarberLogin";
import PrismaBarberRepository from "../../../../database/model/barber.model";

export default async function CompanyAuth(app: FastifyInstance) {
    app.post('/', {
        schema: {
            body: RequestAuthClientDto,
            response: {
                200: ResponseAuthClientDto
            }
        }
    }, async (request, reply) => {
        const { email, password } = request.body as Static<typeof RequestAuthClientDto>;

        const { barber } = await BarberLogin({
            barber_repository: new PrismaBarberRepository(),
            data: { email, password }
        })

        return reply.send({
            token: app.jwt.sign({ email }),
            user: {
                id: barber.id,
                name: barber.name,
                email: barber.email
            }
        });
    });
}