import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { DayJsDateService } from '@/services/dayjs/dayjs-date-service'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const dateService = new DayJsDateService()
  const checkInsRepository = new PrismaCheckInsRepository(dateService)
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMetricsUseCase
}
