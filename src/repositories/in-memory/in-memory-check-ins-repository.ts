import { DateService } from '@/services/date-service'
import { Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import {
  CheckIn,
  CheckInsRepository,
  PAGE_LENGTH,
} from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  constructor(private dateService: DateService) {}

  private checkIns: CheckIn[] = []

  async findById(id: string) {
    return this.checkIns.find((item) => item.id === id) ?? null
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = this.dateService.startOfTheDay(date)
    const endOfTheDay = this.dateService.endOfTheDay(date)

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const isOnSameDate =
        this.dateService.isAfter(checkIn.created_at, startOfTheDay) &&
        this.dateService.isBefore(checkIn.created_at, endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.checkIns
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * PAGE_LENGTH, page * PAGE_LENGTH)
  }

  async countByUserId(userId: string): Promise<number> {
    return this.checkIns.filter((item) => item.user_id === userId).length
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(
      (item) => item.id === checkIn.id,
    )

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn
    }

    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const newCheckIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      gym_id: data.gym_id,
      user_id: data.user_id,
    } as CheckIn

    this.checkIns.push(newCheckIn)

    return newCheckIn
  }
}
