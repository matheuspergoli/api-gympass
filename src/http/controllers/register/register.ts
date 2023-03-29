import { z } from 'zod'
import { hash } from 'bcryptjs'
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

  const hashPassword = await hash(password, 10)

  const userExists = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (userExists) {
    return await res.status(409).send({
      error: 'User already exists'
    })
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: hashPassword
    }
  })

  return await res.status(200).send()
}
