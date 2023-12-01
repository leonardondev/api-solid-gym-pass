import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { DayJsDateService } from '@/services/dayjs/dayjs-date-service'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const dateService = new DayJsDateService()
  const checkInsRepository = new PrismaCheckInsRepository(dateService)
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository)

  return validateCheckInUseCase
}
