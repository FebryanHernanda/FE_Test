import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/id'

dayjs.locale('id')

export { dayjs }
export type { Dayjs }

export const formatDisplayDate = (date: Date | Dayjs | string): string => {
  return dayjs(date).format('DD MMM YYYY')
}

export const formatApiDate = (date: Date | Dayjs | string): string => {
  return dayjs(date).format('YYYY-MM-DD')
}

export const formatFullDate = (date: Date | Dayjs | string): string => {
  return dayjs(date).format('DD MMMM YYYY')
}

export const formatDateTime = (date: Date | Dayjs | string): string => {
  return dayjs(date).format('DD MMM YYYY, HH:mm')
}

export const formatDayName = (date: Date | Dayjs | string): string => {
  return dayjs(date).format('dddd')
}

export const formatShortDate = (date: Date | Dayjs | string): string => {
  return dayjs(date).format('DD/MM/YYYY')
}

export const getCurrentDateTime = (): string => {
  return dayjs().format('DD MMM YYYY, HH:mm')
}
