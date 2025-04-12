'use client';

import {
  CASH_FLOW_COLORS,
  cashFlowData,
  cashFlowLegend,
  financialViewOptions,
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
import { Title } from 'rizzui';

export default function CashFlow({ className }: { className?: string }) {
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Cash Flow"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter"
      headerClassName="items-center"
      className={cn('min-h-[28rem]', className)}
      action={
        <div className="flex gap-5">
          <CustomLegend className="hidden @[28rem]:inline-flex" />
          <DropdownAction
            onChange={handleChange}
            className="rounded-md border"
            options={financialViewOptions}
            dropdownClassName="!z-0"
          />
        </div>
      }
    >
      <div className="mb-3 mt-1 flex items-center gap-2 @[28rem]:mb-4">
        <Title as="h2" className="font-semibold">
          $78.45k
        </Title>
        <span className="flex items-center gap-1 text-green-dark">
          <TrendingUpIcon className="h-auto w-5" />
          <span className="font-medium leading-none"> +52.40%</span>
        </span>
      </div>
      <CustomLegend className="-mt-0 mb-4 inline-flex @[28rem]:hidden" />
      <div className="w-full lg:mt-7">
        <div className="custom-scrollbar overflow-x-auto scroll-smooth -mb-3 pb-3">
          <div className="h-[24rem] w-full pt-6 @lg:pt-8">
            <ResponsiveContainer width="100%" height="100%" minWidth={1450}>
              <ComposedChart
                barGap={8}
                data={cashFlowData}
                margin={{
                  left: -20,
                  top: 20,
                }}
                className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-bar]:translate-x-4 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 [&_.recharts-cartesian-axis.yAxis]:translate-x-2.5 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-xAxis.xAxis]:translate-x-[14px] [&_.recharts-xAxis.xAxis]:translate-y-2.5 [&_path.recharts-rectangle]:!stroke-none"
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
                  dataKey="income"
                  fill={CASH_FLOW_COLORS[0]}
                  barSize={28}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  type="natural"
                  dataKey="outgoing"
                  fill={CASH_FLOW_COLORS[1]}
                  barSize={28}
                  radius={[4, 4, 0, 0]}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </WidgetCard>
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
      {cashFlowLegend.map((item, index) => (
        <div key={item.name} className="flex items-center gap-1.5">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: CASH_FLOW_COLORS[index] }}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
