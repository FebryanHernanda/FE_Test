import type { LalinTableRow } from '@/types/lalin'

export function paginateData(
  data: LalinTableRow[],
  page: number,
  pageSize: number
): LalinTableRow[] {
  const start = (page - 1) * pageSize
  return data.slice(start, start + pageSize)
}
