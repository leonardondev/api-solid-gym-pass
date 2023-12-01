export interface DateService {
  startOfTheDay(date: Date): Date
  endOfTheDay(date: Date): Date
  isAfter(refDate: Date, targetDate: Date): boolean
  isBefore(refDate: Date, targetDate: Date): boolean
}
