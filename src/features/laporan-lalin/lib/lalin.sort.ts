import type { LalinTableRow, LalinSortConfig } from '@/types/lalin'

export function sortData(data: LalinTableRow[], config: LalinSortConfig): LalinTableRow[] {
  const { field, direction } = config

  return [...data].sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc' ? aValue - bValue : bValue - aValue
    }

    // Special handling for date sorting
    if (field === 'Tanggal') {
      const comparison = a.TanggalRaw.localeCompare(b.TanggalRaw)
      return direction === 'asc' ? comparison : -comparison
    }

    const aStr = String(aValue || '').toLowerCase()
    const bStr = String(bValue || '').toLowerCase()
    const comparison = aStr.localeCompare(bStr)
    return direction === 'asc' ? comparison : -comparison
  })
}
