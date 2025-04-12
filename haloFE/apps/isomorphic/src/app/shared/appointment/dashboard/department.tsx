'use client';

import WidgetCard from '@core/components/cards/widget-card';
import DropdownAction from '@core/components/charts/dropdown-action';
import TrendingUpIcon from '@core/components/icons/trending-up';
import cn from '@core/utils/class-names';
import { formatNumber } from '@core/utils/format-number';
import {
  Bar,
  ComposedChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { Title } from 'rizzui';

const data = [
  {
    name: 'Dr. Consultant',
    total: 530,
    fill: '#2B7F75',
  },
  {
    name: 'Therapy',
    total: 915,
    fill: '#FFD66B',
  },
  {
    name: 'Conference',
    total: 785,
    fill: '#04364A',
  },
  {
    name: 'Training',
    total: 345,
    fill: '#176B87',
  },
  {
    name: 'Marketing',
    total: 915,
    fill: '#64CCC5',
  },
  {
    name: 'Management',
    total: 260,
    fill: '#F7B787',
  },
];

const viewOptions = [
  {
    value: 'Daily',
    label: 'Daily',
  },
  {
    value: 'Monthly',
    label: 'Monthly',
  },
];

export default function Department({ className }: { className?: string }) {
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Appointment by Department"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter"
      headerClassName="items-center"
      className={cn('@container', className)}
      action={
        <DropdownAction
          className="rounded-lg border"
          options={viewOptions}
          onChange={handleChange}
        />
      }
    >
      <div className="mb-4 mt-2 flex items-center gap-2 @lg:mt-1">
        <Title as="h2" className="font-inter font-bold">
          73,504
        </Title>
        <span className="flex items-center gap-1 text-green-dark">
          <TrendingUpIcon className="h-auto w-5" />
          <span className="font-semibold leading-none"> +32.40%</span>
        </span>
      </div>
      <div className='custom-scrollbar overflow-x-auto scroll-smooth'>
        <div className="h-[20rem] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              layout="vertical"
              data={data}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-300 dark:[&_.recharts-cartesian-axis-tick-value]:fill-gray-700 [&_path.recharts-rectangle]:!stroke-none"
            >
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                hide={true}
              />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: 13, fontWeight: 500 }}
                width={100}
                className="rtl:-translate-x-24 [&_.recharts-text]:fill-gray-700"
              />
              <Bar dataKey="total" barSize={28} radius={[50, 50, 50, 50]}>
                <LabelList
                  position="right"
                  dataKey="total"
                  content={<CustomizedLabel />}
                />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </WidgetCard>
  );
}

function CustomizedLabel(props: any) {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <rect
        x={x + width - 44}
        y={y + 4}
        width={40}
        height={height - 8}
        rx={radius}
        fill="#ffffff"
      />
      <text
        y={y + 1 + height / 2}
        x={x + width - 24}
        fill="currentColor"
        className="text-[13px] font-medium text-gray-800 dark:text-gray-200"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {formatNumber(value)}
      </text>
    </g>
  );
}
