'use client';

import {
  expenseHistoryData,
  financialViewOptions,
} from '@/data/financial-data';
import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import DropdownAction from '@core/components/charts/dropdown-action';
import cn from '@core/utils/class-names';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Title } from 'rizzui';

export default function ExpenseHistory({ className }: { className?: string }) {
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Expense History"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter"
      headerClassName="items-center"
      action={
        <DropdownAction
          className="rounded-md border"
          options={financialViewOptions}
          onChange={handleChange}
          dropdownClassName="!z-0"
        />
      }
      className={cn('min-h-[28rem]', className)}
    >
      <div className="mb-4 mt-1 flex items-center gap-2">
        <Title as="h2" className="font-semibold">
          $108.87k
        </Title>
      </div>
      <div className="custom-scrollbar overflow-x-auto scroll-smooth -mb-3 pb-3">
        <div className="h-[27.3rem] w-full pe-1 pt-9">
          <ResponsiveContainer width="100%" height="100%" minWidth={400}>
            <AreaChart
              data={expenseHistoryData}
              margin={{
                left: 2,
                right: 5,
                bottom: 10,
              }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <defs>
                <linearGradient id="amountCustomer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EE0000" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#EE0000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tickMargin={20}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={20}
                tickFormatter={(label) => `$${label}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                dataKey="amount"
                stroke="#EE0000"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#amountCustomer)"
                dot={<CustomizedDot />}
                activeDot={<CustomizedDot />}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </WidgetCard>
  );
}

function CustomizedDot(props: any) {
  const { cx, cy } = props;
  return (
    <svg
      x={cx - 6}
      y={cy - 9}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className="scale-150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="7"
        cy="7"
        r="5.5"
        fill="#EE0000"
        stroke="white"
        strokeWidth="4"
      />
    </svg>
  );
}
