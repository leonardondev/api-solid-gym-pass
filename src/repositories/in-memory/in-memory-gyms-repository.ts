import {
  Coordinate,
  getDistanceBetweenCoordinates,
} from '@/utils/get-distance-between-coordinates'
import { Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import {
  DISTANCE_RADIUS_IN_KILOMETERS,
  Gym,
  GymsRepository,
  PAGE_LENGTH,
} from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  private gyms: Gym[] = []

  async findById(id: string) {
    return this.gyms.find((gym) => gym.id === id) ?? null
  }

  async findManyNearby(coordinates: Coordinate, page: number) {
    return this.gyms
      .filter((gym) => {
        const distance = getDistanceBetweenCoordinates(coordinates, {
          latitude: Number(gym.latitude),
          longitude: Number(gym.longitude),
        })
        return distance <= DISTANCE_RADIUS_IN_KILOMETERS
      })
      .slice((page - 1) * PAGE_LENGTH, page * PAGE_LENGTH)
  }

  async searchMany(query: string, page: number) {
    return this.gyms
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * PAGE_LENGTH, page * PAGE_LENGTH)
  }

  async create(data: Prisma.GymCreateInput) {
    const newGym = {
      id: data.id ?? randomUUID(),
      created_at: new Date(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: data.latitude,
      longitude: data.longitude,
    } as Gym

    this.gyms.push(newGym)

    return newGym
  }
}
