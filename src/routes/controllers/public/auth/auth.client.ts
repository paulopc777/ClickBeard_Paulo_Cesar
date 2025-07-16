import { FastifyInstance } from "fastify";
import { RequestAuthClientDto } from "../../../view/auth/auth.client.dto";
import { Static } from "@fastify/type-provider-typebox";



export default async function AuthClient(app: FastifyInstance) {

    app.post<{ Body: Static<typeof RequestAuthClientDto> }>('/login', {
        schema: {
            body: RequestAuthClientDto
        }
    }, async (request, reply) => {
        const { email, password } = request.body;

        
    });

}