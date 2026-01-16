import { useState } from 'react'
import {
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Tooltip,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { COLORS } from '@/constants/theme'

interface UserInfo {
  name: string
  role: string
  avatar: string
}

interface NavbarProps {
  onMenuClick?: () => void
  showMenuButton?: boolean
  onLogout: () => void
  onSettingsClick?: () => void
  user?: UserInfo
  appTitle?: string
}

const DEFAULT_USER: UserInfo = {
  name: 'Febryan Hernanda',
  role: 'Super Admin',
  avatar: 'AC',
}

const DEFAULT_TITLE = 'Sistem Monitoring Lalu Lintas & Transaksi Tol'

export default function Navbar({
  onMenuClick,
  showMenuButton = false,
  onLogout,
  onSettingsClick,
  user = DEFAULT_USER,
  appTitle = DEFAULT_TITLE,
}: NavbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSettingsClick = () => {
    handleClose()
    onSettingsClick?.()
  }

  const handleLogout = () => {
    handleClose()
    onLogout()
  }

  return (
    <header
      className="sticky top-0 z-30 h-18 w-full bg-white"
      style={{
        borderBottom: `1px solid ${COLORS.border.light}`,
        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left Section: Menu Toggle & Static Title */}
        <div className="flex items-center gap-4">
          {showMenuButton && (
            <IconButton
              edge="start"
              onClick={onMenuClick}
              sx={{
                color: COLORS.brand.primary,
                '&:hover': {
                  backgroundColor: COLORS.bg.hover,
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            component="h1"
            sx={{
              color: COLORS.text.primary,
              fontWeight: 600,
              fontSize: { xs: '1rem', md: '1.125rem' },
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
            }}
          >
            {appTitle}
          </Typography>
        </div>

        {/* Right Section: Profile & Settings */}
        <div className="flex items-center">
          {/* User Profile (Static) */}
          <div className="mr-0 flex items-center gap-3 rounded-lg px-2 py-1">
            <Avatar
              sx={{
                width: 36,
                height: 36,
                backgroundColor: COLORS.bg.tertiary,
                color: COLORS.brand.primary,
                border: `1px solid ${COLORS.border.light}`,
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              {user.avatar}
            </Avatar>

            <div className="hidden text-left md:block">
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: COLORS.text.primary,
                  lineHeight: 1.2,
                  fontSize: '0.875rem',
                }}
              >
                {user.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: COLORS.text.secondary,
                  lineHeight: 1,
                  display: 'block',
                  mt: 0.25,
                }}
              >
                {user.role}
              </Typography>
            </div>
          </div>

          <Divider 
            orientation="vertical" 
            flexItem 
            sx={{ 
              height: 24, 
              alignSelf: 'center', 
              mx: 1,
              display: { xs: 'none', md: 'block' } 
            }} 
          />

          {/* Menu Trigger (Settings on Desktop, Arrow on Mobile) */}
          <Tooltip title="Menu Aplikasi">
            <IconButton
              onClick={handleProfileClick}
              sx={{
                color: COLORS.text.secondary,
                '&:hover': {
                  color: COLORS.brand.primary,
                  backgroundColor: COLORS.bg.hover,
                },
              }}
            >
              <SettingsIcon sx={{ display: { xs: 'none', md: 'block' }, fontSize: 24 }} />
              <KeyboardArrowDownIcon sx={{ display: { xs: 'block', md: 'none' }, fontSize: 24 }} />
            </IconButton>
          </Tooltip>

          {/* Application Menu Dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.08))',
                mt: 1.5,
                minWidth: 200,
                border: `1px solid ${COLORS.border.light}`,
                borderRadius: 2,
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {onSettingsClick && (
              <MenuItem onClick={handleSettingsClick} sx={{ py: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <SettingsIcon fontSize="small" sx={{ color: COLORS.text.secondary }} />
                </ListItemIcon>
                <Typography variant="body2" fontWeight={500}>
                  Pengaturan
                </Typography>
              </MenuItem>
            )}

            {onSettingsClick && <Divider sx={{ my: 0.5 }} />}

            <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: COLORS.status.error }}>
              <ListItemIcon sx={{ minWidth: 32, color: COLORS.status.error }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2" fontWeight={600}>
                Keluar Aplikasi
              </Typography>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  )
}
