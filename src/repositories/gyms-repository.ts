import { Coordinate } from '@/utils/get-distance-between-coordinates'
import { Prisma, Gym as PrismaGymModel } from '@prisma/client'

export type Gym = PrismaGymModel

export const PAGE_LENGTH = 20
export const DISTANCE_RADIUS_IN_KILOMETERS = 10

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  findManyNearby(coordinates: Coordinate, page: number): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
}
