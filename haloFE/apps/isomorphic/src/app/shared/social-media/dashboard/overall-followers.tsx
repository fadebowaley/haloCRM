'use client';

import {
  socialMediaOptions,
  socialMediaOverallChartData,
} from '@/data/social-media-dashboard-data';
import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import { useMedia } from '@core/hooks/use-media';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge } from 'rizzui';
import { SocialMediaFilter } from './utils';

export default function OverallFollowers({
  className,
}: {
  className?: string;
}) {
  const [state, setState] = useState(socialMediaOptions[0]);
  const isTablet = useMedia('(max-width: 800px)', false);

  return (
    <WidgetCard
      className={className}
      title="Overall Followers"
      titleClassName="whitespace-nowrap"
      headerClassName="flex-col @md:flex-row @md:items-center gap-2 mb-6"
      actionClassName="w-full flex justify-end items-center ps-0"
      action={
        <>
          <Badge className="hidden capitalize" color="info" variant="flat">
            {state.label}
          </Badge>
          <SocialMediaFilter value={state} onChange={setState} />
        </>
      }
    >
      <div className="custom-scrollbar overflow-x-auto scroll-smooth">
        <div className="h-[400px] w-full @4xl:h-[260px] @7xl:h-[24rem] 3xl:h-[28rem] 4xl:h-[512px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '700px' })}
          >
            <AreaChart
              data={socialMediaOverallChartData}
              margin={{
                left: -10,
                right: 15,
                bottom: 25,
              }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5EC3FF" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#FD5DEF" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0 0" strokeOpacity={0.435} />
              <XAxis
                dataKey="name"
                tickMargin={10}
                tickLine={false}
                textAnchor="end"
              />
              <YAxis tickLine={false} tickFormatter={formatYAxisTick} />
              <Tooltip
                content={<CustomTooltip />}
                cursor={false}
                defaultIndex={4}
              />
              <Area
                strokeWidth={2}
                type="monotone"
                dataKey="profit"
                stroke="url(#colorGradient)"
                fill="url(#colorGradient)"
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </WidgetCard>
  );
}

const formatYAxisTick = (value: number): string => {
  if (value >= 1000) {
    return `$${value / 1000}k`;
  }
  return value.toString();
};
