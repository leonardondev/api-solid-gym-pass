import { prisma } from '@/lib/prisma'
import { Coordinate } from '@/utils/get-distance-between-coordinates'
import { Prisma } from '@prisma/client'
import {
  DISTANCE_RADIUS_IN_KILOMETERS,
  Gym,
  GymsRepository,
  PAGE_LENGTH,
} from '../gyms-repository'

export class PrismasGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async findManyNearby({ latitude, longitude }: Coordinate, page: number) {
    /* Fórmula de Haversine */
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos(
          cos( radians(${latitude}) ) *
          cos( radians( latitude ) ) *
          cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) *
          sin( radians( latitude ) )
        ) ) <= ${DISTANCE_RADIUS_IN_KILOMETERS}
    `

    return gyms.slice((page - 1) * PAGE_LENGTH, page * PAGE_LENGTH)
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: PAGE_LENGTH,
      skip: (page - 1) * PAGE_LENGTH,
    })

    return gyms
  }
}
