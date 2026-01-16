// Brand colors and chart palettes

export const BRAND_COLORS = {
  // Primary
  primary: '#1e3a5f',
  primaryLight: '#2d4a6f',
  primaryDark: '#152a47',

  // Secondary
  secondary: '#f9a825',
  secondaryLight: '#fbc02d',
  secondaryDark: '#f57f17',

  // Neutrals
  neutral100: '#f8fafc',
  neutral200: '#e2e8f0',
  neutral300: '#cbd5e1',
  neutral400: '#94a3b8',
  neutral500: '#64748b',
  neutral600: '#475569',
  neutral700: '#334155',
  neutral800: '#1e293b',
  neutral900: '#0f172a',
} as const

// Categorical chart palette
export const CHART_PALETTE_CATEGORICAL = [
  '#2563eb', 
  '#0891b2', 
  '#059669', 
  '#7c3aed', 
  '#d97706', 
  '#dc2626', 
] as const

// Gate ranking palette
export const CHART_PALETTE_GATE_RANKING = [
  '#1e3a5f', 
  '#2a4d7d', 
  '#3d6199', 
  '#547ab5', 
  '#6f93d1', 
  '#94a3b8', 
] as const

// Shift distribution palette
export const CHART_PALETTE_TEMPORAL = [
  '#f59e0b', 
  '#0891b2', 
  '#1e3a5f', 
] as const

// Payment method colors
export const CHART_PALETTE_PAYMENT: Record<string, string> = {
  // Banks
  'BCA': '#0066b3',
  'BRI': '#00529c',
  'BNI': '#f15a24',
  'Mandiri': '#003d79',
  'DKI': '#7c3aed',
  'Mega': '#dc2626',
  
  // Others
  'Flo': '#0891b2',
  'KTP': '#64748b',
  'Tunai': '#059669',
  
  // Default
  'default': '#1e3a5f',
} as const

export const getPaymentColor = (method: string): string => {
  if (method in CHART_PALETTE_PAYMENT) {
    return CHART_PALETTE_PAYMENT[method]
  }
  // Partial match fallback
  for (const key of Object.keys(CHART_PALETTE_PAYMENT)) {
    if (method.toUpperCase().includes(key.toUpperCase())) {
      return CHART_PALETTE_PAYMENT[key]
    }
  }
  return CHART_PALETTE_PAYMENT['default']
}

export default BRAND_COLORS
