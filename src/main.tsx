import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline } from '@mui/material'

import App from '@/app/App'
import { queryClient } from '@/app/queryClient'

import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
