import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Login from '../pages/auth/LoginPage'
import LaporanLaluLintasPage from '@/pages/laporan-lalu-lintas/LaporanLaluLintasPage'
import MasterGerbangPage from '@/pages/master-gerbang/MasterGerbangPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'laporan/harian',
        element: <LaporanLaluLintasPage />,
      },
      {
        path: 'master-gerbang',
        element: <MasterGerbangPage />,
      },
    ],
  },
])
