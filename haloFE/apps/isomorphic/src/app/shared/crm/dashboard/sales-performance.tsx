'use client';

import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import { useTheme } from 'next-themes';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box } from 'rizzui';

const data = [
  {
    day: 'Mon',
    sales: 10,
  },
  {
    day: 'Tue',
    sales: 40,
  },
  {
    day: 'Wed',
    sales: 48,
  },
  {
    day: 'Thu',
    sales: 33,
  },
  {
    day: 'Fri',
    sales: 25,
  },
  {
    day: 'Sat',
    sales: 25,
  },
  {
    day: 'Sun',
    sales: 50,
  },
];

export default function SalesPerformance({
  className,
}: {
  className?: string;
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <WidgetCard rounded="lg" className={className} title="Sales Performance">
      <div className="custom-scrollbar overflow-x-auto scroll-smooth w-full">
        <Box className="mt-6 h-72 w-full @sm:mt-3 @lg:mt-8">
          <ResponsiveContainer width="100%" height="100%" minWidth={400}>
            <BarChart
              data={data}
              margin={{
                left: -5,
                right: 5,
                bottom: 10,
              }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tickMargin={20}
              />
              <YAxis axisLine={false} tickLine={false} tickMargin={20} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="sales"
                className="fill-[#29CCB1] dark:[fill-opacity:0.9]"
                name="Average Time"
                barSize={16}
                radius={20}
                background={{
                  fill: isDark ? '#333333' : '#F1F1F2',
                  radius: 20,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </div>
    </WidgetCard>
  );
}
