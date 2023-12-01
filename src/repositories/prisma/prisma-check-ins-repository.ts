import { prisma } from '@/lib/prisma'
import { DateService } from '@/services/date-service'
import { Prisma } from '@prisma/client'
import {
  CheckIn,
  CheckInsRepository,
  PAGE_LENGTH,
} from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  constructor(private dateService: DateService) {}

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = this.dateService.startOfTheDay(date)
    const endOfTheDay = this.dateService.endOfTheDay(date)

    const checkInOnSameDate = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay,
          lte: endOfTheDay,
        },
      },
    })

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: PAGE_LENGTH,
      skip: (page - 1) * PAGE_LENGTH,
    })

    return checkIns
  }

  async countByUserId(userId: string) {
    const count = prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }
}
