// Shared traffic calculation utilities
import type { LalinItem } from '@/types/lalin'

export function calculateETollTotal(row: LalinItem): number {
  return (
    (row.eMandiri || 0) +
    (row.eBri || 0) +
    (row.eBni || 0) +
    (row.eBca || 0) +
    (row.eNobu || 0) +
    (row.eDKI || 0) +
    (row.eMega || 0)
  )
}

export function calculateKTPTotal(row: LalinItem): number {
  return (row.DinasOpr || 0) + (row.DinasMitra || 0) + (row.DinasKary || 0)
}

export function calculateTotalTraffic(row: LalinItem): number {
  return (row.Tunai || 0) + calculateETollTotal(row) + (row.eFlo || 0) + calculateKTPTotal(row)
}
