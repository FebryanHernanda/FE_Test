import type { MasterGerbang, SortConfig } from '@/types/masterGerbang'

const SEARCH_FIELDS: (keyof MasterGerbang)[] = ['NamaGerbang', 'NamaCabang']

export function filterGerbang(data: MasterGerbang[], query: string): MasterGerbang[] {
  if (!data) return []
  if (!query?.trim()) return data

  const lowerQuery = query.toLowerCase().trim()

  return data.filter((item) =>
    SEARCH_FIELDS.some((field) => {
      const value = item[field]
      return String(value || '').toLowerCase().includes(lowerQuery)
    })
  )
}

export function sortGerbang(data: MasterGerbang[], config: SortConfig): MasterGerbang[] {
  const { field, direction } = config
  if (!field) return data

  return [...data].sort((a, b) => {
    const aValue = a[field as keyof MasterGerbang]
    const bValue = b[field as keyof MasterGerbang]

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc' ? aValue - bValue : bValue - aValue
    }

    const aStr = String(aValue || '').toLowerCase()
    const bStr = String(bValue || '').toLowerCase()
    const comparison = aStr.localeCompare(bStr)
    return direction === 'asc' ? comparison : -comparison
  })
}

export function paginateGerbang(
  data: MasterGerbang[],
  page: number,
  pageSize: number
): MasterGerbang[] {
  const start = (page - 1) * pageSize
  return data.slice(start, start + pageSize)
}
