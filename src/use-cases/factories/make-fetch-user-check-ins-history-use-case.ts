import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { DayJsDateService } from '@/services/dayjs/dayjs-date-service'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const dateService = new DayJsDateService()
  const checkInsRepository = new PrismaCheckInsRepository(dateService)
  const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
    checkInsRepository,
  )

  return fetchUserCheckInsHistoryUseCase
}
