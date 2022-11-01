import Fastify from "fastify";
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'

const prisma = new PrismaClient({
    log: ['query']
})
async function bootstrap() {
    // first function
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: true,
    })

    await fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count()
        return {
            count,
        }
    })

    await fastify.listen({
        port: 3333,
        host: "0.0.0.0"
    })
}

bootstrap()