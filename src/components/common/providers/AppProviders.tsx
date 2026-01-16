import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/id'
import { queryClient } from '@/lib/queryClient'

interface AppProvidersProps {
  children: React.ReactNode
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
        <CssBaseline />
        {children}
      </LocalizationProvider>
    </QueryClientProvider>
  )
}
