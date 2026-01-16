import type { LalinSortField } from '@/types/lalin'

export interface LalinColumnConfig {
  label: string
  field?: LalinSortField
  align: 'left' | 'center' | 'right'
  width?: number
}

export const LALIN_TABLE_COLUMNS: LalinColumnConfig[] = [
  { label: 'No', align: 'center', width: 45 },
  { label: 'Ruas', field: 'Ruas', align: 'center', width: 100 },
  { label: 'Gerbang', field: 'Gerbang', align: 'center', width: 110 },
  { label: 'Gardu', field: 'Gardu', align: 'center', width: 55 },
  { label: 'Shift', field: 'Shift', align: 'center', width: 50 },
  { label: 'Hari', field: 'Hari', align: 'center', width: 75 },
  { label: 'Tanggal', field: 'Tanggal', align: 'center', width: 85 },
  { label: 'Metode', align: 'center', width: 70 },
  { label: 'Gol I', field: 'Gol1', align: 'center', width: 60 },
  { label: 'Gol II', field: 'Gol2', align: 'center', width: 60 },
  { label: 'Gol III', field: 'Gol3', align: 'center', width: 60 },
  { label: 'Gol IV', field: 'Gol4', align: 'center', width: 60 },
  { label: 'Gol V', field: 'Gol5', align: 'center', width: 60 },
  { label: 'Total', field: 'TotalLalin', align: 'center', width: 80 },
]
