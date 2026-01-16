import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import MenuIcon from '@mui/icons-material/Menu'

import { COLORS } from '@/constants/theme'
import { LAYOUT } from '@/constants/layout'
import {
  NAVIGATION_ITEMS,
  NAVIGATION_ICONS,
  type NavigationItem,
} from '@/components/common/layout/navigation'
import { ROUTES } from '@/constants/routes'

import fullLogo from '@/assets/logo/Logo.png'
import markLogo from '@/assets/logo/Logo-mark.png'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  onLogout: () => void
  isMobile?: boolean
}

export default function Sidebar({ collapsed, onToggle, onLogout, isMobile = false }: SidebarProps) {
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    'Laporan Lalu Lintas': true,
  })

  const handleToggleMenu = (menuLabel: string) => {
    if (collapsed) {
      onToggle()
      setOpenMenus((prev) => ({
        ...prev,
        [menuLabel]: true,
      }))
      return
    }

    setOpenMenus((prev) => ({
      ...prev,
      [menuLabel]: !prev[menuLabel],
    }))
  }

  const isActive = (path?: string) => {
    if (!path) return false
    if (path === ROUTES.DASHBOARD) {
      return location.pathname === '/' || location.pathname === ROUTES.DASHBOARD
    }
    return location.pathname === path
  }

  const isParentActive = (children?: NavigationItem[]) => {
    if (!children) return false
    return children.some((child) => child.path && location.pathname === child.path)
  }

  const sidebarWidth = collapsed ? LAYOUT.sidebar.collapsedWidth : LAYOUT.sidebar.expandedWidth

  return (
    <aside
      className="flex h-full flex-col border-r bg-white transition-[width] duration-300 ease-in-out"
      style={{
        width: sidebarWidth,
        borderColor: COLORS.border.light,
      }}
    >
      {/* Top Section: Logo */}
      <div
        className="h-18 relative flex items-center justify-center px-3"
        style={{ borderBottom: `1px solid ${COLORS.border.light}` }}
      >
        <div className="flex flex-1 items-center justify-center overflow-hidden">
          {collapsed ? (
            <img src={markLogo} alt="Jasa Marga" className="h-auto w-8 object-contain" />
          ) : (
            <img src={fullLogo} alt="Jasa Marga" className="max-w-140 block h-10 object-contain" />
          )}
        </div>
      </div>

      {/* Middle Section: Navigation */}
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto py-6">
        <List disablePadding>
          {NAVIGATION_ITEMS.map((item) => (
            <div key={item.label} className="mb-0.5">
              {item.children ? (
                <>
                  {/* Parent Menu Item */}
                  <ListItem disablePadding sx={{ px: 2 }}>
                    <Tooltip title={collapsed ? item.label : ''} placement="right" arrow>
                      <ListItemButton
                        onClick={() => handleToggleMenu(item.label)}
                        sx={{
                          borderRadius: 2,
                          minHeight: 48,
                          justifyContent: collapsed ? 'center' : 'flex-start',
                          px: collapsed ? 1 : 2,
                          color: isParentActive(item.children)
                            ? COLORS.brand.primary
                            : COLORS.text.primary,
                          backgroundColor: isParentActive(item.children)
                            ? COLORS.bg.active
                            : 'transparent',
                          '&:hover': {
                            backgroundColor: COLORS.bg.active,
                            color: COLORS.brand.primary,
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: collapsed ? 0 : 36,
                            justifyContent: 'center',
                            color: 'inherit',
                          }}
                        >
                          {NAVIGATION_ICONS[item.iconKey]}
                        </ListItemIcon>
                        {!collapsed && (
                          <>
                            <ListItemText
                              primary={item.label}
                              primaryTypographyProps={{
                                fontSize: 14,
                                fontWeight: isParentActive(item.children) ? 600 : 500,
                              }}
                            />
                            {openMenus[item.label] ? (
                              <ExpandLess sx={{ ml: 1, color: 'inherit', opacity: 0.7 }} />
                            ) : (
                              <ExpandMore sx={{ ml: 1, color: 'inherit', opacity: 0.7 }} />
                            )}
                          </>
                        )}
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>

                  {/* Child Menu Items */}
                  <Collapse in={!collapsed && openMenus[item.label]} timeout="auto" unmountOnExit>
                    <List disablePadding>
                      {item.children.map((child) => (
                        <ListItem key={child.path} disablePadding sx={{ px: 2 }}>
                          <ListItemButton
                            component={Link}
                            to={child.path || '#'}
                            className="group"
                            sx={{
                              borderRadius: 2,
                              mt: 0.5,
                              minHeight: 40,
                              pl: collapsed ? 1 : 6.5,
                              justifyContent: collapsed ? 'center' : 'flex-start',
                              backgroundColor: 'transparent',
                              '&:hover': {
                                backgroundColor: 'transparent',
                              },
                            }}
                          >
                            {!collapsed && (
                              <div
                                className="absolute left-7 top-1/2 h-1.5 w-1.5 -translate-y-1/2 transform rounded-full transition-colors duration-200"
                                style={{
                                  backgroundColor: isActive(child.path)
                                    ? COLORS.brand.primary
                                    : COLORS.text.light,
                                }}
                              />
                            )}
                            {collapsed ? (
                              <Tooltip title={child.label} placement="right" arrow>
                                <ListItemIcon
                                  sx={{
                                    minWidth: 0,
                                    justifyContent: 'center',
                                    color: isActive(child.path)
                                      ? COLORS.brand.primary
                                      : COLORS.text.secondary,
                                  }}
                                >
                                  {NAVIGATION_ICONS[child.iconKey]}
                                </ListItemIcon>
                              </Tooltip>
                            ) : (
                              <ListItemText
                                primary={child.label}
                                primaryTypographyProps={{
                                  fontSize: 14,
                                  fontWeight: isActive(child.path) ? 600 : 400,
                                  color: isActive(child.path)
                                    ? COLORS.brand.primary
                                    : COLORS.text.secondary,
                                }}
                              />
                            )}
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                /* Regular Menu Item */
                <ListItem disablePadding sx={{ px: 2 }}>
                  <Tooltip title={collapsed ? item.label : ''} placement="right" arrow>
                    <ListItemButton
                      component={Link}
                      to={item.path || '#'}
                      sx={{
                        borderRadius: 2,
                        minHeight: 48,
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        px: collapsed ? 1 : 2,
                        color: isActive(item.path) ? COLORS.brand.primary : COLORS.text.primary,
                        backgroundColor: isActive(item.path) ? COLORS.bg.active : 'transparent',
                        '&:hover': {
                          backgroundColor: COLORS.bg.active,
                          color: COLORS.brand.primary,
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: collapsed ? 0 : 36,
                          justifyContent: 'center',
                          color: 'inherit',
                        }}
                      >
                        {NAVIGATION_ICONS[item.iconKey]}
                      </ListItemIcon>
                      {!collapsed && (
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: isActive(item.path) ? 600 : 500,
                          }}
                        />
                      )}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              )}
            </div>
          ))}
        </List>
      </div>

      {/* Bottom Section: Collapse Toggle & Logout */}
      <div className="p-1" style={{ borderTop: `1px solid ${COLORS.border.light}` }}>
        {/* Collapse Toggle */}
        {!isMobile && (
          <ListItemButton
            onClick={onToggle}
            sx={{
              borderRadius: 2,
              minHeight: 40,
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 1 : 2,
              mb: 1,
              color: COLORS.text.secondary,
              '&:hover': {
                backgroundColor: COLORS.bg.hover,
                color: COLORS.brand.primary,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: collapsed ? 0 : 36,
                justifyContent: 'center',
                color: 'inherit',
              }}
            >
              {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary="Collapse Sidebar"
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              />
            )}
          </ListItemButton>
        )}

        {/* Logout Button */}
        <Tooltip title={collapsed ? 'Keluar' : ''} placement="right" arrow>
          <ListItemButton
            onClick={onLogout}
            sx={{
              borderRadius: 2,
              minHeight: 48,
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 1 : 2,
              color: COLORS.status.error,
              backgroundColor: COLORS.status.errorBg,
              '&:hover': {
                backgroundColor: COLORS.status.errorHover,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: collapsed ? 0 : 36,
                justifyContent: 'center',
                color: 'inherit',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary="Keluar"
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: 600,
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </div>
    </aside>
  )
}
