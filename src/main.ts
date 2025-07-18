import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import Fastify from 'fastify'
import AuthClient from './routes/controllers/public/auth/auth.client';
import ClientRegister from './routes/controllers/public/register/client.register';

const fastify = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();
fastify.register(require('@fastify/jwt'), {
    secret: "ser",
})

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})




fastify.listen({ port: 5050, host: '0.0.0.0' })
