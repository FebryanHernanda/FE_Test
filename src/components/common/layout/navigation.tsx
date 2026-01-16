import DashboardIcon from '@mui/icons-material/Dashboard'
import AssessmentIcon from '@mui/icons-material/Assessment'
import DoorSlidingIcon from '@mui/icons-material/DoorSliding'
import DescriptionIcon from '@mui/icons-material/Description'
import type { ReactNode } from 'react'
import { ROUTES } from '../../../constants/routes'

export interface NavigationItem {
  label: string
  path?: string
  iconKey: string
  children?: NavigationItem[]
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    iconKey: 'dashboard',
  },
  {
    label: 'Laporan Lalu Lintas',
    iconKey: 'assessment',
    children: [
      {
        label: 'Laporan Harian',
        path: ROUTES.LAPORAN.HARIAN,
        iconKey: 'description',
      },
    ],
  },
  {
    label: 'Master Gerbang',
    path: ROUTES.MASTER_GERBANG,
    iconKey: 'doorSliding',
  },
]

export const NAVIGATION_ICONS: Record<string, ReactNode> = {
  dashboard: <DashboardIcon />,
  assessment: <AssessmentIcon />,
  doorSliding: <DoorSlidingIcon />,
  description: <DescriptionIcon />,
}
