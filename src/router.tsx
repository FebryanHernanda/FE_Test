import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import LaporanHarian from './pages/LaporanHarian'
import MasterGerbang from './pages/MasterGerbang'

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
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'laporan/harian',
        element: <LaporanHarian />,
      },
      {
        path: 'master-gerbang',
        element: <MasterGerbang />,
      },
    ],
  },
])
