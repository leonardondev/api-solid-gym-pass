import dayjs from 'dayjs'
import { DateService } from '../date-service'

export class DayJsDateService implements DateService {
  startOfTheDay(date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')

    return startOfTheDay.toDate()
  }

  endOfTheDay(date: Date) {
    const endOfTheDay = dayjs(date).endOf('date')

    return endOfTheDay.toDate()
  }

  isAfter(refDate: Date, targetDate: Date): boolean {
    return dayjs(refDate).isAfter(targetDate)
  }

  isBefore(refDate: Date, targetDate: Date): boolean {
    return dayjs(refDate).isBefore(targetDate)
  }
}
