import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/common/layout'
import { ROUTES } from '@/constants/routes'
import { ProtectedRoute } from './ProtectedRoute'

import LoginPage from '@/features/auth/LoginPage'
import DashboardPage from '@/features/dashboard/DashboardPage'
import LaporanLalinPage from '@/features/laporan-lalin/LaporanLalinPage'
import MasterGerbangPage from '@/features/master-gerbang/MasterGerbangPage'

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: ROUTES.DASHBOARD.substring(1),
            element: <DashboardPage />,
          },
          {
            path: ROUTES.LAPORAN.HARIAN.substring(1),
            element: <LaporanLalinPage />,
          },
          {
            path: ROUTES.MASTER_GERBANG.substring(1),
            element: <MasterGerbangPage />,
          },
        ],
      },
    ],
  },
])
