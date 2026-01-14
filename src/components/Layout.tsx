import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssessmentIcon from '@mui/icons-material/Assessment'
import DoorSlidingIcon from '@mui/icons-material/DoorSliding'

const DRAWER_WIDTH = 260

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Laporan Harian', icon: <AssessmentIcon />, path: '/laporan/harian' },
  { text: 'Master Gerbang', icon: <DoorSlidingIcon />, path: '/master-gerbang' },
]

export default function Layout() {
  const location = useLocation()

  return (
    <Box className="flex min-h-screen">
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" className="font-semibold">
            Logo
          </Typography>
        </Toolbar>
        <Box className="overflow-auto">
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        className="flex-1"
        sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ backgroundColor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div" color="text.primary">
              Navbar
            </Typography>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    </Box>
  )
}
