import { PrismasGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismasGymsRepository()
  const createGymUseCase = new CreateGymUseCase(gymsRepository)

  return createGymUseCase
}
