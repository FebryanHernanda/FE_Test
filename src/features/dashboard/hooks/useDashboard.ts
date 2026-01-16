import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Dayjs } from '@/lib/date'
import { formatApiDate } from '@/lib/date'

import { fetchDashboardLalins, fetchDashboardGerbangs } from '@/features/dashboard/api/dashboardApi'
import { mapDashboardData } from '@/features/dashboard/lib/dashboard.mapper'
import type { DashboardOverview } from '@/types/dashboard'
import type { LalinItem } from '@/types/lalin'
import type { MasterGerbang } from '@/types/masterGerbang'

const QUERY_KEYS = {
  lalins: ['dashboard', 'lalins'] as const,
  gerbangs: ['dashboard', 'gerbangs'] as const,
}

interface UseDashboardOptions {
  selectedDate: Dayjs | null
}

interface UseDashboardReturn {
  data: DashboardOverview | null
  isLoading: boolean
  isFetching: boolean
  error: Error | null
  refetch: () => void
}

export function useDashboard(options: UseDashboardOptions): UseDashboardReturn {
  const { selectedDate } = options

  const lalinsQuery = useQuery<{ data: { rows: { rows: LalinItem[] } } }, Error>({
    queryKey: QUERY_KEYS.lalins,
    queryFn: fetchDashboardLalins,
    staleTime: 1000 * 60 * 5,
  })

  const gerbangsQuery = useQuery<MasterGerbang[], Error>({
    queryKey: QUERY_KEYS.gerbangs,
    queryFn: fetchDashboardGerbangs,
    staleTime: 1000 * 60 * 10,
  })

  const dashboardData = useMemo<DashboardOverview | null>(() => {
    if (!lalinsQuery.data || !gerbangsQuery.data) return null

    const lalins = lalinsQuery.data?.data?.rows?.rows ?? []
    const gerbangs = gerbangsQuery.data ?? []
    const filterDate = selectedDate ? formatApiDate(selectedDate) : null

    return mapDashboardData(lalins, gerbangs, filterDate)
  }, [lalinsQuery.data, gerbangsQuery.data, selectedDate])

  const isLoading = lalinsQuery.isLoading || gerbangsQuery.isLoading
  const isFetching = lalinsQuery.isFetching || gerbangsQuery.isFetching
  const error = lalinsQuery.error || gerbangsQuery.error

  const refetch = () => {
    lalinsQuery.refetch()
    gerbangsQuery.refetch()
  }

  return {
    data: dashboardData,
    isLoading,
    isFetching,
    error,
    refetch,
  }
}
