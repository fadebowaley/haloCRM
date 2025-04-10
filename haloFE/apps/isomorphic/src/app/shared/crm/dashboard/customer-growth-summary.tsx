'use client';

import { revenueSummaryData } from '@/data/crm-dashboard-data';
import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import { DatePicker } from '@core/ui/datepicker';
import cn from '@core/utils/class-names';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box } from 'rizzui';

export default function CustomerGrowthSummary({
  className,
}: {
  className?: string;
}) {
  const [startDate, setStartDate] = useState(new Date());
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <WidgetCard
      className={cn('@container', className)}
      title="Customer Growth Summary"
      description="Revealing risk and growth in investments."
      action={
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date!)}
          dateFormat="yyyy"
          showYearPicker
          placeholderText="Select Year"
          inputProps={{ variant: 'text', inputClassName: 'p-0 px-1 h-auto' }}
          popperPlacement="bottom-end"
          className="w-[100px]"
        />
      }
    >
      <div className="custom-scrollbar overflow-x-auto scroll-smooth w-full">
        <Box className="mt-[22px] h-[350px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={600}>
            <BarChart
              data={revenueSummaryData}
              margin={{
                top: 22,
                left: -15,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <CartesianGrid strokeDasharray="1 0" vertical={false} />
              <XAxis dataKey="day" tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip formattedNumber />} />
              <Bar
                barSize={24}
                fill={'#59A7FF'}
                dataKey={'revenue'}
                radius={[0, 0, 6, 6]}
                activeBar={<Rectangle fill="#2CDDC7" stroke="#2CDDC7" />}
                activeIndex={getActiveIndex()}
                background={{ fill: isDark ? '#333333' : '#F1F1F2', radius: 6 }}
              >
                <LabelList dataKey="revenue" content={renderCustomizedLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </div>
    </WidgetCard>
  );
}

function renderCustomizedLabel(props: any) {
  const { x, y, index } = props;
  let isActive = index === getActiveIndex();

  return (
    <g>
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />
        </filter>
      </defs>
      <rect
        x={x - 8}
        y={y - 4}
        width="40"
        height="4"
        rx="4"
        fill={isActive ? '#2CDDC7' : '#59A7FF'}
        filter="url(#shadow)"
      />
    </g>
  );
}

function getActiveIndex() {
  let thisMonthName = new Date().toLocaleString('default', { month: 'short' });
  let activeIndex = revenueSummaryData.findIndex(
    (data) => data.day === thisMonthName
  );

  return activeIndex;
}
