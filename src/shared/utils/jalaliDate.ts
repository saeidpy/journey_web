import {DateIOFormats} from '@date-io/core/IUtils'
import AdapterJalali from '@date-io/date-fns-jalali'
export const jalaliDate = new AdapterJalali()

export const formatDate = (date?: string | Date | null, format?: keyof DateIOFormats<string>) =>
  date && format ? jalaliDate.format(jalaliDate.date(date), format) : undefined

export const setDateWithTime = (inputDate: Date | string, timeString: string): Date => {
  const date = new Date(inputDate)
  const [hours, minutes, seconds] = timeString.split(':').map(Number)
  date.setHours(hours || 0)
  date.setMinutes(minutes || 0)
  date.setSeconds(seconds || 0)

  return date
}

export const formatDateByString = (date?: string | Date | null, format?: string) =>
  date && format ? jalaliDate.formatByString(jalaliDate.date(date), format) : undefined

export const dateApiFormat = (date?: string | Date | null) => new Date(date ?? new Date()).toISOString().substring(0, 10)

export const addDaysDate = (days: number, date?: string | Date | null) => {
  var result = new Date(date ?? new Date())
  result.setDate(result.getDate() + days)
  return result
}

export const toLocaleDate = (date: string) => {
  const dateObject = new Date(date)
  const year = dateObject.getFullYear()
  const month = String(dateObject.getMonth() + 1).padStart(2, '0')
  const day = String(dateObject.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
