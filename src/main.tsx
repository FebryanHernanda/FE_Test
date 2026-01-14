import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CssBaseline from '@mui/material/CssBaseline'
import { router } from './router'
import { queryClient } from './lib/queryClient'
import './index.css'

const theme = createTheme({
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    button: {
      textTransform: 'none',
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <RouterProvider router={router} />
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
