import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Dayjs } from '@/lib/date'
import { formatApiDate } from '@/lib/date'
import { useDebounce } from '@/hooks/useDebounce'
import { fetchLalins } from '../api/lalinApi'
import { fetchGerbangs } from '@/features/master-gerbang/api/gerbangApi'
import { mapLalinData } from '../lib/lalin.mapper'
import type { LalinTabType, LalinSortConfig, LalinSortField } from '@/types/lalin'

const LALIN_QUERY_KEY = ['lalins']
const GERBANG_QUERY_KEY = ['gerbangs']
const DEFAULT_SORT: LalinSortConfig = { field: 'Tanggal', direction: 'desc' }
const DEFAULT_PAGE_SIZE = 25

export function useLalin() {
  // State
  const [date, setDate] = useState<Dayjs | null>(null)
  const [tab, setTab] = useState<LalinTabType>('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState<LalinSortConfig>(DEFAULT_SORT)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  const debouncedSearch = useDebounce(searchQuery, 400)

  // Queries
  const { data: gerbangData = [] } = useQuery({
    queryKey: GERBANG_QUERY_KEY,
    queryFn: fetchGerbangs,
    staleTime: 1000 * 60 * 30,
  })

  const {
    data: rawApiResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: LALIN_QUERY_KEY,
    queryFn: fetchLalins,
    staleTime: 1000 * 60 * 5,
  })

  // Data Pipeline Delegation
  const viewData = useMemo(() => {
    const rawRows = rawApiResponse?.data?.rows?.rows || []
    if (rawRows.length === 0 || gerbangData.length === 0) {
      return {
        paginatedRows: [],
        totalRows: 0,
        kpi: { totalTunai: 0, totalEToll: 0, totalFlo: 0, totalKTP: 0, totalAll: 0 },
        subtotals: {},
        grandTotal: 0,
        rows: [],
      }
    }

    return mapLalinData(rawRows, gerbangData, {
      filterDate: date ? formatApiDate(date) : null,
      filterTab: tab,
      searchQuery: debouncedSearch,
      sortConfig,
      page: currentPage,
      pageSize,
    })
  }, [rawApiResponse, gerbangData, date, tab, debouncedSearch, sortConfig, currentPage, pageSize])

  // Handlers
  const handleDateChange = (newDate: Dayjs | null) => {
    setDate(newDate)
    setCurrentPage(1)
  }

  const handleTabChange = (newTab: LalinTabType) => {
    setTab(newTab)
    setCurrentPage(1)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1)
  }

  const handleSortChange = (field: LalinSortField) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc',
    }))
  }

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.max(1, Math.ceil(viewData.totalRows / pageSize))
    const validPage = Math.max(1, Math.min(newPage, totalPages))
    setCurrentPage(validPage)
  }

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setDate(null)
    setTab('Semua')
    setSearchQuery('')
    setSortConfig(DEFAULT_SORT)
    setCurrentPage(1)
    setPageSize(DEFAULT_PAGE_SIZE)
  }

  const hasData = viewData.rows.length > 0
  const totalPages = Math.max(1, Math.ceil(viewData.totalRows / pageSize))

  return {
    data: viewData.paginatedRows,
    kpiSummary: viewData.kpi,
    subtotalsByRuas: viewData.subtotals,
    grandTotal: viewData.grandTotal,
    loading: isLoading,
    error: isError ? error : null,
    hasData,

    pagination: {
      page: currentPage,
      pageSize,
      totalItems: viewData.totalRows,
      totalPages,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
    },
    filter: {
      date,
      tab,
      search: searchQuery,
      sort: sortConfig,
      onDateChange: handleDateChange,
      onTabChange: handleTabChange,
      onSearchChange: handleSearchChange,
      onSortChange: handleSortChange,
      onReset: handleReset,
    },
    actions: {
      refresh: refetch,
    },
  }
}
