import { Prisma, CheckIn as PrismaCheckInModel } from '@prisma/client'

export type CheckIn = PrismaCheckInModel

export const PAGE_LENGTH = 20

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findById(id: string): Promise<CheckIn | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  save(checkIn: CheckIn): Promise<CheckIn>
}
