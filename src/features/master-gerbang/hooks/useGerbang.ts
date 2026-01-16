import { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useDebounce } from '@/hooks/useDebounce'
import {
  fetchGerbangs,
  createGerbangMutation,
  updateGerbangMutation,
  deleteGerbangMutation,
} from '../api/gerbangApi'
import { processGerbangData } from '../lib/gerbang.mapper'
import type {
  MasterGerbangPayload,
  DeleteGerbangPayload,
  SortConfig,
  SortField,
} from '@/types/masterGerbang'

const GERBANG_QUERY_KEY = ['gerbangs']

export function useGerbang() {
  const queryClient = useQueryClient()

  // STATE
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'id', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const debouncedSearch = useDebounce(searchQuery, 400)

  // QUERY
  const {
    data: rawData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: GERBANG_QUERY_KEY,
    queryFn: fetchGerbangs,
    staleTime: 5 * 60 * 1000,
  })

  // ORCHESTRATOR DELEGATION
  const viewData = useMemo(() => {
    return processGerbangData(rawData, {
      searchQuery: debouncedSearch,
      sortConfig,
      page: currentPage,
      pageSize,
    })
  }, [rawData, debouncedSearch, sortConfig, currentPage, pageSize])

  // PAGINATION META
  const totalItems = viewData.totalItems
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  // MUTATIONS
  const onSuccess = () => queryClient.invalidateQueries({ queryKey: GERBANG_QUERY_KEY })

  const createMutation = useMutation({
    mutationFn: (data: MasterGerbangPayload) => createGerbangMutation(data),
    onSuccess,
  })

  const updateMutation = useMutation({
    mutationFn: (data: MasterGerbangPayload) => updateGerbangMutation(data),
    onSuccess,
  })

  const deleteMutation = useMutation({
    mutationFn: (data: DeleteGerbangPayload) => deleteGerbangMutation(data),
    onSuccess: () => {
      onSuccess()
      if (viewData.paginatedData.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1)
      }
    },
  })

  // HANDLERS
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleReset = () => {
    setSearchQuery('')
    setSortConfig({ field: 'id', direction: 'asc' })
    setCurrentPage(1)
  }

  return {
    data: viewData.paginatedData,
    rawData,
    loading: isLoading,
    error: isError ? error : null,

    pagination: {
      page: currentPage,
      pageSize,
      totalItems,
      totalPages,
      onPageChange: setCurrentPage,
      onPageSizeChange: (size: number) => {
        setPageSize(size)
        setCurrentPage(1)
      },
    },

    filter: {
      search: searchQuery,
      sort: sortConfig,
      onSearch: handleSearch,
      onSort: handleSort,
      onReset: handleReset,
    },

    actions: {
      create: createMutation.mutateAsync,
      update: updateMutation.mutateAsync,
      delete: deleteMutation.mutateAsync,
      refresh: refetch,
      isCreating: createMutation.isPending,
      isUpdating: updateMutation.isPending,
      isDeleting: deleteMutation.isPending,
      createError: createMutation.error,
      updateError: updateMutation.error,
      deleteError: deleteMutation.error,
    },
  }
}
