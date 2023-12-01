import { PrismasGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismasGymsRepository()
  const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository)

  return fetchNearbyGymsUseCase
}
