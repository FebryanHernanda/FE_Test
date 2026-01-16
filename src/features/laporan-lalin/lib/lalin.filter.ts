import type { LalinTableRow, LalinTabType } from '@/types/lalin'

const SEARCH_FIELDS: (keyof LalinTableRow)[] = ['Ruas', 'Gerbang']

export function filterByDate(data: LalinTableRow[], date: string | null): LalinTableRow[] {
  if (!date) return data
  return data.filter((row) => row.TanggalRaw === date)
}

export function filterByTab(data: LalinTableRow[], tab: LalinTabType): LalinTableRow[] {
  switch (tab) {
    case 'Tunai':
      return data.filter((row) => row.MetodePembayaran === 'Tunai')
    case 'E-Toll':
      return data.filter((row) => row.MetodePembayaran === 'E-Toll')
    case 'Flo':
      return data.filter((row) => row.MetodePembayaran === 'Flo')
    case 'KTP':
      return data.filter((row) => row.MetodePembayaran === 'KTP')
    case 'E-Toll + Tunai + Flo':
      return data.filter((row) => ['E-Toll', 'Tunai', 'Flo'].includes(row.MetodePembayaran))
    case 'Semua':
    default:
      return data
  }
}

export function filterBySearch(data: LalinTableRow[], query: string): LalinTableRow[] {
  if (!query.trim()) return data

  const lowerQuery = query.toLowerCase().trim()

  return data.filter((row) =>
    SEARCH_FIELDS.some((field) =>
      String(row[field] || '')
        .toLowerCase()
        .includes(lowerQuery)
    )
  )
}
