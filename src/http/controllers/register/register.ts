import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import type { FastifyRequest, FastifyReply } from 'fastify'

export const registerController = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<any> => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password
    }
  })

  return await res.status(200).send()
}
