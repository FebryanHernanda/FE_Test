// Theme constants - colors, radius, zIndex

export const COLORS = {
  // Brand
  brand: {
    primary: '#1e3a5f',
    primaryDark: '#152a47',
    primaryLight: '#2d4a6f',
    accent: '#f9a825',
    accentDark: '#c17900',
  },

  // Text
  text: {
    primary: '#1f2937',
    secondary: '#64748b',
    muted: '#94a3b8',
    light: '#cbd5e1',
    inverse: '#ffffff',
  },

  // Background
  bg: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
    active: 'rgba(30, 58, 95, 0.08)',
    hover: 'rgba(30, 58, 95, 0.04)',
  },

  // Border
  border: {
    light: '#e2e8f0',
    default: '#cbd5e1',
    dark: '#94a3b8',
  },

  // Status
  status: {
    error: '#ef4444',
    errorBg: '#fef2f2',
    errorHover: '#fee2e2',
    success: '#22c55e',
    successBg: '#f0fdf4',
    warning: '#f59e0b',
    warningBg: '#fffbeb',
  },
} as const

export const RADIUS = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
} as const

export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const

export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
} as const
