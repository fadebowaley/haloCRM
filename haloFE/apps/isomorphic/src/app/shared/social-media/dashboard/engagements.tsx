'use client';

import { engagementsChartData } from '@/data/social-media-dashboard-data';
import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import { useMedia } from '@core/hooks/use-media';
import { DatePicker } from '@core/ui/datepicker';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge } from 'rizzui';

export default function EngageMents({ className }: { className?: string }) {
  const [startDate, setStartDate] = useState(new Date());
  const isTablet = useMedia('(max-width: 800px)', false);

  return (
    <WidgetCard
      title="Engagements"
      action={
        <>
          <div className="hidden @2xl:block">
            <Badge renderAsDot className="me-0.5 bg-[#2B7F75]" /> Positive
            <Badge renderAsDot className="me-0.5 ms-4 bg-[#64CCC5]" /> Neutral
            <Badge renderAsDot className="me-0.5 ms-4 bg-[#FFD66B]" /> Negative
          </div>
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
        </>
      }
      actionClassName="flex items-center gap-4"
      className={className}
    >
      <div className="custom-scrollbar overflow-x-auto scroll-smooth">
        <div className="h-96 w-full pt-9">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '700px' })}
          >
            <BarChart
              data={engagementsChartData}
              barSize={16}
              margin={{
                top: 20,
                left: -24,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="positive" fill="#2B7F75" stackId="a" radius={10} />
              <Bar dataKey="neutral" stackId="a" fill="#64CCC5" radius={10} />
              <Bar dataKey="negative" stackId="a" fill="#FFD66B" radius={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </WidgetCard>
  );
}
