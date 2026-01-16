import type { MasterGerbang } from '@/types/masterGerbang'
import { calculateETollTotal, calculateKTPTotal } from '@/lib/trafficCalculations'

export type GerbangLookup = Map<number, MasterGerbang>

export function createGerbangLookup(gerbangs: MasterGerbang[]): GerbangLookup {
  return new Map(gerbangs.map((g) => [g.id, g]))
}

export function getRuasName(idGerbang: number, lookup: GerbangLookup): string {
  return lookup.get(idGerbang)?.NamaCabang || `Cabang ${idGerbang}`
}

export function getGerbangName(idGerbang: number, lookup: GerbangLookup): string {
  return lookup.get(idGerbang)?.NamaGerbang || `Gerbang ${idGerbang}`
}

export { calculateETollTotal, calculateKTPTotal }
