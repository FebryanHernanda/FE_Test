import { COLORS, RADIUS } from '@/constants/theme'
import { BRAND_COLORS } from '@/lib/colors'
import type { LalinTabType } from '@/types/lalin'

interface LalinTabsProps {
  activeTab: LalinTabType
  onTabChange: (tab: LalinTabType) => void
}

const TABS: { label: string; value: LalinTabType }[] = [
  { label: 'Semua', value: 'Semua' },
  { label: 'E-Toll', value: 'E-Toll' },
  { label: 'Tunai', value: 'Tunai' },
  { label: 'Flo', value: 'Flo' },
  { label: 'KTP', value: 'KTP' },
  { label: 'Kombinasi', value: 'E-Toll + Tunai + Flo' },
]

export function LalinTabs({ activeTab, onTabChange }: LalinTabsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.value
        return (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            style={{
              color: isActive ? '#ffffff' : BRAND_COLORS.neutral600,
              backgroundColor: isActive ? BRAND_COLORS.primary : COLORS.bg.tertiary,
              borderRadius: RADIUS.md,
              border: isActive ? 'none' : `1px solid ${COLORS.border.light}`,
              cursor: 'pointer',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: isActive ? 600 : 500,
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
