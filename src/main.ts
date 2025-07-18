import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import Fastify from 'fastify'
import Routes from './routes/controllers/routes';

const fastify = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();
fastify.register(require('@fastify/jwt'), {
    secret: "ser",
})

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

fastify.register(Routes)

fastify.listen({ port: 5050, host: '0.0.0.0' })
