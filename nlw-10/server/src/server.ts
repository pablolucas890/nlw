import Fastify from "fastify";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { poolRoutes } from "./routes/poll";
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";
import { guessRoutes } from "./routes/guess";
import { userRoutes } from "./routes/user";

async function bootstrap() {
   // first function
   const fastify = Fastify({
      logger: true
   })

   await fastify.register(cors, {
      origin: true,
   })

   // Em producao isso precisa ser uma variavel ambiente
   await fastify.register(jwt, {
      secret: 'nlwcopa'
   })

   // Chama as Rotas
   fastify.register(authRoutes)
   fastify.register(gameRoutes)
   fastify.register(guessRoutes)
   fastify.register(poolRoutes)
   fastify.register(userRoutes)

   await fastify.listen({
      port: 8080,
      host: "0.0.0.0"
   })
}

bootstrap()
