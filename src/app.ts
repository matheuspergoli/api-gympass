import fastify from 'fastify'
import { registerController } from './http/controllers/register'

export const app = fastify()

app.post('/users', registerController)
