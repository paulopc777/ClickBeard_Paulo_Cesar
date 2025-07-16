import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import Fastify from 'fastify'

const fastify = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>()


fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

fastify.listen({ port: 3000, host: '0.0.0.0' })
