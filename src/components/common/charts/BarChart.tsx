
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  LabelList,
  Label,
} from 'recharts';
import { Paper, Typography } from '@mui/material';
import { CHART_PALETTE_CATEGORICAL, BRAND_COLORS } from '@/lib/colors';
import { COLORS, RADIUS, SHADOWS } from '@/constants/theme';

interface BarChartProps<T> {
  data: T[];
  dataKey: keyof T;
  nameKey: keyof T;
  layout?: 'horizontal' | 'vertical';
  colors?: string[];
  colorFn?: (item: T, index: number) => string;
  height?: number;
  barSize?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const formatter = new Intl.NumberFormat('id-ID');

// Compact formatter for labels (e.g. 1.2k)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const compactFormatter = (value: any) => {
  const numValue = Number(value);
  if (isNaN(numValue)) return '';
  if (numValue >= 1000000) return `${(numValue / 1000000).toFixed(1)}M`;
  if (numValue >= 1000) return `${(numValue / 1000).toFixed(1)}k`;
  return String(numValue);
};

interface TooltipPayload {
  value: number;
  name: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
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
          {label}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: BRAND_COLORS.primary, 
            fontWeight: 700,
            fontSize: '14px',
          }}
        >
          {formatter.format(payload[0].value)}
        </Typography>
      </Paper>
    );
  }
  return null;
};

export function BarChartComponent<T extends object>({
  data,
  dataKey,
  nameKey,
  layout = 'horizontal',
  colors = [...CHART_PALETTE_CATEGORICAL],
  colorFn,
  height = 280,
  barSize = 28,
  xAxisLabel,
  yAxisLabel,
}: BarChartProps<T>) {
  const isVertical = layout === 'vertical';

  // Function to get bar color - supports both array and function
  const getBarColor = (item: T, index: number): string => {
    if (colorFn) {
      return colorFn(item, index);
    }
    return colors[index % colors.length];
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        layout={isVertical ? 'vertical' : 'horizontal'}
        margin={
          isVertical
            ? { top: 8, right: 30, left: 10, bottom: 20 }
            : { top: 30, right: 8, left: 0, bottom: 20 }
        }
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={true} 
          horizontal={true} 
          stroke={COLORS.border.light} 
          opacity={0.3}
        />
        {isVertical ? (
          <>
            <XAxis type="number" hide>
               {xAxisLabel && <Label value={xAxisLabel} position="bottom" offset={0} style={{ fill: BRAND_COLORS.neutral500, fontSize: '11px', fontWeight: 500 }} />}
            </XAxis>
            <YAxis
              dataKey={nameKey as string}
              type="category"
              axisLine={false}
              tickLine={false}
              width={100}
              tick={{ 
                fill: BRAND_COLORS.neutral700, 
                fontSize: 12, 
                fontWeight: 500,
              }}
            >
               {yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" style={{ fill: BRAND_COLORS.neutral500, fontSize: '11px', fontWeight: 500 }} />}
            </YAxis>
          </>
        ) : (
          <>
            <XAxis
              dataKey={nameKey as string}
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: BRAND_COLORS.neutral600, 
                fontSize: 11, 
                fontWeight: 500,
              }}
              dy={8}
            >
               {xAxisLabel && <Label value={xAxisLabel} position="insideBottom" offset={-10} style={{ fill: BRAND_COLORS.neutral500, fontSize: '11px', fontWeight: 500 }} />}
            </XAxis>
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: BRAND_COLORS.neutral500, 
                fontSize: 11,
              }}
              tickFormatter={(value) => (value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value)}
            >
               {yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={10} style={{ fill: BRAND_COLORS.neutral500, fontSize: '11px', fontWeight: 500 }} />}
            </YAxis>
          </>
        )}
        <Tooltip 
          content={<CustomTooltip />} 
          cursor={{ fill: 'rgba(30, 58, 95, 0.04)' }} 
        />
        <Bar
          dataKey={dataKey as string}
          radius={isVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]}
          barSize={barSize}
        >
          {data.map((item, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(item, index)} />
          ))}
          <LabelList 
            dataKey={dataKey as string} 
            position={isVertical ? "right" : "top"} 
            formatter={compactFormatter}
            style={{ 
              fontSize: '11px', 
              fontWeight: 600, 
              fill: BRAND_COLORS.neutral600 
            }}
          />
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;
