import type { FastifyInstance } from 'fastify'
import { register } from './controllers/register'

export const appRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post('/users', register)
}
