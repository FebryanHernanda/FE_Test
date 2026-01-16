import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { getToken } from '@/lib/storage'

export const ProtectedRoute = () => {
  if (!getToken()) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}
