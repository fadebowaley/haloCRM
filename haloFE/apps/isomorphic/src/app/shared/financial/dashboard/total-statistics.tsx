'use client';

import {
  financialViewOptions,
  totalStatisticsData,
  totalStatisticsLegend,
} from '@/data/financial-data';
import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import DropdownAction from '@core/components/charts/dropdown-action';
import TrendingUpIcon from '@core/components/icons/trending-up';
import cn from '@core/utils/class-names';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Flex, Title } from 'rizzui';

const COLORS = {
  BG: {
    revenue: "bg-[#28D775]",
    expenses: "bg-[#111A23] dark:bg-[#273849]"
  },
  FILL: {
    revenue: "fill-[#28D775]",
    expenses: "fill-[#111A23] dark:fill-[#273849]"
  },
  STROKE: {
    revenue: "stroke-[#28D775]",
    expenses: "stroke-[#111A23] dark:fill-[#273849]"
  }
}

export default function TotalStatistics({ className }: { className?: string }) {
  const handleChange = (viewType: string) => {
    console.log('viewType', viewType);
  };

  return (
    <WidgetCard
      title="Total Statistics"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter"
      headerClassName="items-center"
      action={
        <Flex align="center" gap="5">
          <CustomLegend className="hidden @[28rem]:mt-0 @[28rem]:inline-flex" />
          <DropdownAction
            className="rounded-md border"
            options={financialViewOptions}
            onChange={handleChange}
            dropdownClassName="!z-0"
          />
        </Flex>
      }
      className={cn('min-h-[28rem] @container', className)}
    >
      <StatisticsSummary />
      <CustomLegend className="mb-4 mt-0 inline-flex @[28rem]:hidden" />
      <ChartContainer />
    </WidgetCard>
  );
}

function StatisticsSummary() {
  return (
    <div className="mb-3 mt-1 flex items-center gap-2 @[28rem]:mb-4">
      <Title as="h2" className="font-semibold">
        $83.45k
      </Title>
      <span className="flex items-center gap-1 text-green-dark">
        <TrendingUpIcon className="h-auto w-5" />
        <span className="font-medium leading-none"> +32.40%</span>
      </span>
    </div>
  );
}

function ChartContainer() {
  return (
    <div className="custom-scrollbar overflow-x-auto scroll-smooth -mb-3 pb-3">
      <div className="h-[24rem] w-full pt-6 @lg:pt-8">
        <ResponsiveContainer width="100%" height="100%" minWidth={900}>
          <ComposedChart
            barGap={8}
            data={totalStatisticsData}
            margin={{ left: -17, top: 20 }}
            className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-xAxis.xAxis]:translate-y-2.5 [&_path.recharts-rectangle]:!stroke-none"
          >
            <CartesianGrid
              vertical={false}
              strokeOpacity={0.435}
              strokeDasharray="8 10"
            />
            <XAxis dataKey="label" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(label) => `$${label}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar
              dataKey="revenue"
              barSize={28}
              radius={[4, 4, 0, 0]}
              className={cn(COLORS.FILL["revenue"], COLORS.STROKE["revenue"])}
            />
            <Bar
              type="natural"
              dataKey="expenses"
              barSize={28}
              radius={[4, 4, 0, 0]}
              className={cn(COLORS.FILL["expenses"], COLORS.STROKE["expenses"])}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CustomLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'mt-2 flex flex-wrap items-start gap-3 lg:gap-7',
        className
      )}
    >
      {totalStatisticsLegend.map((item) => (
        <div key={item.name} className="flex items-center gap-1.5">
          <span className={cn("-mt-0.5 h-3 w-3 rounded-full", COLORS.BG[item.name.toLowerCase() as keyof typeof COLORS.BG])} />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}