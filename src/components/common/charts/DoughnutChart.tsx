
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Paper, Typography } from '@mui/material';
import { CHART_PALETTE_CATEGORICAL, BRAND_COLORS } from '@/lib/colors';
import { COLORS, RADIUS, SHADOWS, Z_INDEX } from '@/constants/theme';

interface DoughnutChartProps<T> {
  data: T[];
  dataKey: keyof T;
  nameKey: keyof T;
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
  height?: number;
  showLegend?: boolean;
}

const formatter = new Intl.NumberFormat('id-ID');

interface TooltipPayload {
  value: number;
  name: string;
  percent?: number;
  payload: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  total?: number;
}

const CustomTooltip = ({ active, payload, total = 0 }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    let percent = 0;
    if (total > 0) {
      percent = Math.round((value / total) * 100);
    } else {
      const rawPercent = payload[0].percent ?? 0;
      percent = Math.round(rawPercent * 100);
    }
    
    return (
      <Paper
        elevation={0}
        sx={{
          px: 2,
          py: 1.5,
          backgroundColor: COLORS.bg.primary,
          border: `1px solid ${COLORS.border.light}`,
          borderRadius: RADIUS.lg,
          boxShadow: SHADOWS.md,
          zIndex: Z_INDEX.tooltip, 
        }}
      >
        <Typography 
          variant="caption" 
          sx={{ 
            color: BRAND_COLORS.neutral600, 
            fontWeight: 500, 
            display: 'block', 
            mb: 0.5,
            fontSize: '11px',
          }}
        >
          {payload[0].name}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: BRAND_COLORS.primary, 
            fontWeight: 700,
            fontSize: '14px',
          }}
        >
          {formatter.format(value)}
          <span style={{ 
            marginLeft: 6, 
            fontWeight: 500, 
            fontSize: '12px',
            color: BRAND_COLORS.neutral500,
          }}>
            ({percent}%)
          </span>
        </Typography>
      </Paper>
    );
  }
  return null;
};

export function DoughnutChart<T extends object>({
  data,
  dataKey,
  nameKey,
  colors = [...CHART_PALETTE_CATEGORICAL],
  innerRadius = 55,
  outerRadius = 75,
  height = 220,
  showLegend = true,
}: DoughnutChartProps<T>) {
  const total = data.reduce((sum, item) => sum + Number(item[dataKey]), 0);

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      {/* Chart Area */}
      <div className="relative flex-1 w-full" style={{ minHeight: height - 10 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data={data as any[]}
              dataKey={dataKey as string}
              nameKey={nameKey as string}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={0}
              stroke="#ffffff"
              strokeWidth={2}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip total={total} />} 
              wrapperStyle={{ zIndex: Z_INDEX.tooltip }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text Summary */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <Typography 
            variant="caption" 
            sx={{ 
              color: BRAND_COLORS.neutral500, 
              fontSize: '11px', 
              fontWeight: 500,
              lineHeight: 1.2
            }}
          >
            Total
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: BRAND_COLORS.primary, 
              fontWeight: 700, 
              fontSize: '16px',
              lineHeight: 1.2
            }}
          >
            {formatter.format(total)}
          </Typography>
        </div>
      </div>

      {/* Legend - Strictly Aligned Vertical Layout */}
      {showLegend && (
        <div className="w-full flex justify-center pb-2">
          <div className="flex flex-col gap-1.5 w-full max-w-70">
            {data.slice(0, 4).map((item, index) => {
              const value = Number(item[dataKey]);
              const percent = total > 0 ? Math.round((value / total) * 100) : 0;
              
              return (
                <div key={index} className="flex items-center justify-between text-xs w-full">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <span 
                      className="font-medium truncate text-slate-600"
                    >
                      {String(item[nameKey])}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-2">
                    <span className="font-semibold text-slate-700 min-w-15 text-right">
                      {formatter.format(value)}
                    </span>
                    <span className="text-slate-400 font-medium w-10 text-right">
                      ({percent}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DoughnutChart;

