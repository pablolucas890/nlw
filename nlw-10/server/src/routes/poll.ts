import { FastifyInstance } from "fastify"
import ShortUniqueId from "short-unique-id"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function poolRoutes(fastify: FastifyInstance) {

   fastify.get('/pools/count', async () => {
      const count = await prisma.pool.count()
      return {
         count,
      }
   })

   fastify.post('/pools', async (req, res) => {
      const createPoolBody = z.object({
         title: z.string()
      })
      const { title } = createPoolBody.parse(req.body)
      const generator = new ShortUniqueId({ length: 6 })
      const code = String(generator()).toUpperCase()

      try {
         await req.jwtVerify()
         await prisma.pool.create({
            data: {
               title,
               code,
               ownerId: req.user.sub,
               participants: {
                  create: {
                     userId: req.user.sub
                  }
               }
            }
         })
      } catch {
         await prisma.pool.create({
            data: {
               title,
               code,
            }
         })
      }
      return res.status(201).send({ code })
   })

   fastify.post('/pools/join', { onRequest: [authenticate] }, async (req, res) => {
      const joinPoolBody = z.object({
         code: z.string()
      })

      const { code } = joinPoolBody.parse(req.body)

      const pool = await prisma.pool.findUnique({
         where: {
            code,
         },
         include: {
            participants: {
               where: {
                  userId: req.user.sub
               }
            }
         }
      })

      if (!pool) {
         return res.status(400).send({
            message: "Poll not found"
         })
      }

      if (pool.participants.length) {
         return res.status(400).send({
            message: "User already join in this poll"
         })
      }

      if (!pool.ownerId) {
         await prisma.pool.update({
            where: {
               id: pool.id
            },
            data: {
               ownerId: req.user.sub
            }
         })
      }

      await prisma.participant.create({
         data: {
            poolId: pool.id,
            userId: req.user.sub
         }
      })

      return res.status(200).send({
         message: "User join this poll with success"
      })
   })

   fastify.get('/pools', { onRequest: [authenticate] }, async (req, res) => {
      const pools = await prisma.pool.findMany({
         where: {
            participants: {
               some: {
                  userId: req.user.sub
               }
            }
         },
         include: {
            _count: {
               select: {
                  participants: true
               }
            },
            participants: {
               select: {
                  id: true,
                  user: {
                     select: {
                        avatarUrl: true
                     }
                  }
               },
               take: 4,
            },
            owner: {
               select: {
                  name: true,
                  id: true
               }
            }
         }
      })
      return res.status(200).send({
         pools,
      })
   })

   fastify.get('/pools/:id', { onRequest: [authenticate] }, async (req, res) => {
      const getPoolParams = z.object({
         id: z.string()
      })
      const { id } = getPoolParams.parse(req.params)

      const pool = await prisma.pool.findUnique({
         where: {
            id,
         },
         include: {
            _count: {
               select: {
                  participants: true
               }
            },
            participants: {
               select: {
                  id: true,
                  user: {
                     select: {
                        avatarUrl: true
                     }
                  }
               },
               take: 4,
            },
            owner: {
               select: {
                  name: true,
                  id: true
               }
            }
         }
      })
      return res.status(200).send({
         pool,
      })
   })
}