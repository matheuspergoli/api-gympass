import type { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register'

export const appRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post('/users', registerController)
}
