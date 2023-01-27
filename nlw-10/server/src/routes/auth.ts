import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import fetch from 'node-fetch'

export async function authRoutes(fastify: FastifyInstance) {
   // Recebe o token logado do mobile e faz um fetch na api do google
   // para obter dados e salvar no banco
   fastify.post('/users', async (req) => {
      const createUserBody = z.object({
         access_token: z.string()
      })
      const { access_token } = createUserBody.parse(req.body)

      const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
         method: 'GET',
         headers: {
            Authorization: `Bearer ${access_token}`
         }
      })
      const userData = await userResponse.json()

      const userInfoSchema = z.object({
         id: z.string(),
         email: z.string().email(),
         name: z.string(),
         picture: z.string().url()
      })

      const userInfo = userInfoSchema.parse(userData)

      return { userInfo }
   })
}