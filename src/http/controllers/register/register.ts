import { z } from 'zod'
import { registerUseCase } from '@/use-cases/register'
import type { FastifyRequest, FastifyReply } from 'fastify'

export const register = async (req: FastifyRequest, res: FastifyReply): Promise<any> => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    await registerUseCase({ name, email, password })
  } catch (error) {
    return await res.status(409).send()
  }

  return await res.status(200).send()
}
