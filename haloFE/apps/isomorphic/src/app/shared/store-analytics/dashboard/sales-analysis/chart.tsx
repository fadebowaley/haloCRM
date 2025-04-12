'use client';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import {
  salesAnalysisChartGradientData,
  salesAnalysisData,
} from '@/data/social-media-dashboard-data';
import { useTheme } from '@core/providers/theme-provider';

export default function Chart() {
  const { theme } = useTheme();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={salesAnalysisData}
        margin={{
          left: -25,
        }}
      >
        <XAxis dataKey="month" tickLine={false} />
        <YAxis tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <defs>
          <linearGradient
            id="salesAnalysisGradientColor"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            {salesAnalysisChartGradientData.map((item, idx) => {
              const stopColor =
                typeof item.color === 'string'
                  ? item.color
                  : theme === 'dark'
                    ? item.color.dark
                    : item.color.light;
              return (
                <stop
                  key={idx}
                  offset={`${item.offset}%`}
                  stopColor={stopColor}
                  stopOpacity={1}
                />
              );
            })}
          </linearGradient>
        </defs>
        <Area
          type="natural"
          dataKey="value"
          stroke="none"
          fill="url(#salesAnalysisGradientColor)"
          strokeWidth={1.5}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
