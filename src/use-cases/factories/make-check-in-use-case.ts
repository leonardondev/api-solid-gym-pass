import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismasGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { DayJsDateService } from '@/services/dayjs/dayjs-date-service'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const dateService = new DayJsDateService()
  const checkInsRepository = new PrismaCheckInsRepository(dateService)
  const gymsRepository = new PrismasGymsRepository()
  const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return checkInUseCase
}
