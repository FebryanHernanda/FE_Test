import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Drawer, useMediaQuery, useTheme } from '@mui/material'

import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { LAYOUT } from '@/constants/layout'
import { COLORS } from '@/constants/theme'
import { logout } from '@/features/auth/domain/auth.session'
import FeatureUnavailableDialog from '@/components/common/feedback/FeatureUnavailableDialog'
import ConfirmationDialog from '@/components/common/feedback/ConfirmationDialog'

export default function AppLayout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      return width >= 600 && width < 900
    }
    return false
  })
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false)

  const handleSidebarToggle = () => {
    setSidebarCollapsed((prev) => !prev)
  }

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen((prev) => !prev)
  }

  const handleLogout = () => {
    setLogoutConfirmationOpen(true)
  }

  const handleConfirmLogout = () => {
    logout()
  }

  const handleSettingsClick = () => {
    setSettingsModalOpen(true)
  }

  const handleSettingsClose = () => {
    setSettingsModalOpen(false)
  }

  const sidebarWidth = sidebarCollapsed
    ? LAYOUT.sidebar.collapsedWidth
    : LAYOUT.sidebar.expandedWidth

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: COLORS.bg.secondary }}>
      {/* Desktop Sidebar Wrapper */}
      {!isMobile && (
        <nav
          className="shrink-0 transition-[width] duration-300 ease-in-out"
          style={{ width: sidebarWidth }}
        >
          <div
            className="fixed left-0 top-0 h-screen transition-[width] duration-300 ease-in-out z-40 bg-white shadow-xl"
            style={{ width: sidebarWidth }}
          >
            <Sidebar
              collapsed={sidebarCollapsed}
              onToggle={handleSidebarToggle}
              onLogout={handleLogout}
            />
          </div>
        </nav>
      )}

      {/* Mobile Sidebar Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileDrawerOpen}
          onClose={handleMobileDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: LAYOUT.sidebar.expandedWidth,
              boxSizing: 'border-box',
              border: 'none',
            },
          }}
        >
          <Sidebar
            collapsed={false}
            onToggle={handleMobileDrawerToggle}
            onLogout={handleLogout}
            isMobile={true}
          />
        </Drawer>
      )}

      {/* Main Content Area */}
      <main
        className="flex min-w-0 flex-1 flex-col min-h-screen"
        style={{ backgroundColor: COLORS.bg.secondary }}
      >
        {/* Top Navbar */}
        <Navbar
          onMenuClick={handleMobileDrawerToggle}
          showMenuButton={isMobile}
          onLogout={handleLogout}
          onSettingsClick={handleSettingsClick}
        />

        {/* Page Content - Centered & Proportional */}
        <div className="w-full flex-1 mx-auto">
          <Outlet />
        </div>
      </main>

      {/* UX Safety Modal */}
      <FeatureUnavailableDialog
        open={settingsModalOpen}
        onClose={handleSettingsClose}
      />

      {/* Logout Confirmation Dialog */}
      <ConfirmationDialog
        open={logoutConfirmationOpen}
        onClose={() => setLogoutConfirmationOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Konfirmasi Keluar"
        message="Apakah Anda yakin ingin keluar dari aplikasi?"
        confirmText="Keluar"
        cancelText="Batal"
        variant="danger"
      />
    </div>
  )
}
