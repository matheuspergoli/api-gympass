import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password
}: RegisterUseCaseRequest): Promise<void> {
  const hashPassword = await hash(password, 10)

  const userExists = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (userExists) {
    throw new Error('email already exists')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: hashPassword
    }
  })
}
