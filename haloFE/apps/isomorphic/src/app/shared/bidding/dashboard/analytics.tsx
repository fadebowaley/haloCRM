'use client';

import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import DropdownAction from '@core/components/charts/dropdown-action';
import cn from '@core/utils/class-names';
import React from 'react';
import {
  CartesianGrid,
  Customized,
  Legend,
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  {
    name: '12:00AM',
    start: 6500,
    end: 4500,
  },
  {
    name: '1:00AM',
    start: 5000,
    end: 6000,
  },
  {
    name: '2:00AM',
    start: 7500,
    end: 9000,
  },
  {
    name: '3.00AM',
    start: 8500,
    end: 7000,
  },
  {
    name: '4.00AM',
    start: 10000,
    end: 12000,
  },
  {
    name: '5.00AM',
    start: 9500,
    end: 12000,
  },
  {
    name: '6.00AM',
    start: 12000,
    end: 8500,
  },
  {
    name: '7.00AM',
    start: 11500,
    end: 9500,
  },
  {
    name: '8.00AM',
    start: 12000,
    end: 13500,
  },
  {
    name: '9.00AM',
    start: 13000,
    end: 14500,
  },
  {
    name: '10.00AM',
    start: 14500,
    end: 12000,
  },
  {
    name: '11.00AM',
    start: 13000,
    end: 10000,
  },
  {
    name: '12.00PM',
    start: 15000,
    end: 16500,
  },
  {
    name: '1:00PM',
    start: 12500,
    end: 11500,
  },
  {
    name: '2:00PM',
    start: 13500,
    end: 8500,
  },
  {
    name: '3.00PM',
    start: 14500,
    end: 12000,
  },
  {
    name: '4.00PM',
    start: 11500,
    end: 10000,
  },
  {
    name: '5.00PM',
    start: 10000,
    end: 11500,
  },
  {
    name: '6.00PM',
    start: 9500,
    end: 11500,
  },
  {
    name: '7.00PM',
    start: 8000,
    end: 5000,
  },
  {
    name: '8.00PM',
    start: 10000,
    end: 8000,
  },
  {
    name: '9.00PM',
    start: 8000,
    end: 9500,
  },
  {
    name: '10.00PM',
    start: 7500,
    end: 9000,
  },
  {
    name: '11.00PM',
    start: 8500,
    end: 11500,
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

export default function Analytics({ className }: { className?: string }) {
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      className={cn('@container', className)}
      headerClassName="flex-wrap gap-4"
      title="Analytics"
      titleClassName="font-inter"
      actionClassName="ml-auto"
      description="Revealing risk and growth in investments."
      action={
        <DropdownAction
          className="rounded-lg border"
          options={viewOptions}
          onChange={handleChange}
          dropdownClassName="!z-0"
        />
      }
    >
      <div className="custom-scrollbar mt-8 w-full overflow-x-auto scroll-smooth">
        <div className="mt-[22px] h-[280px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={600}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 5,
              }}
              className="[&_.recharts-active-dot]:hidden [&_.recharts-layer.recharts-line]:!hidden"
            >
              <CartesianGrid
                strokeDasharray="8 10"
                strokeOpacity={0.435}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tickMargin={20}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={20}
                width={30}
                domain={[0, 20000]}
                tickFormatter={formatYAxis}
                allowDataOverflow
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="start"
                stroke="#0B8B97"
                strokeWidth={0}
              />
              <Line
                type="monotone"
                dataKey="end"
                stroke="#FF7729"
                strokeWidth={0}
              />
              <Customized component={CustomizedRectangle} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </WidgetCard>
  );
}

const formatYAxis = (tick: any) => {
  if (tick >= 1000000) return `${tick / 1000000000}b`;
  if (tick >= 1000000) return `${tick / 1000000}m`;
  if (tick >= 1000) return `${tick / 1000}k`;
  return tick;
};

const CustomizedRectangle = (props: any) => {
  const { formattedGraphicalItems } = props;

  const firstSeries = formattedGraphicalItems[0];
  const secondSeries = formattedGraphicalItems[1];

  return firstSeries?.props?.points.map((firstSeriesPoint: any, index: any) => {
    const secondSeriesPoint = secondSeries?.props?.points[index];
    const yDifference = firstSeriesPoint.y - secondSeriesPoint.y;

    const fillColor =
      yDifference > 0 ? '#0B8B97' : yDifference < 0 ? '#FF7729' : 'none';

    return (
      <React.Fragment key={firstSeriesPoint.payload.name + index}>
        <Rectangle
          key={firstSeriesPoint.payload.name + index + 'top-bar'}
          width={2}
          height={yDifference}
          x={secondSeriesPoint.x - 1}
          y={secondSeriesPoint.y - 10}
          fill={fillColor}
          radius={2}
        />
        <Rectangle
          key={firstSeriesPoint.payload.name + index + 'main'}
          width={8}
          height={yDifference}
          x={secondSeriesPoint.x - 4}
          y={secondSeriesPoint.y}
          fill={fillColor}
          radius={2}
        />
        <Rectangle
          key={firstSeriesPoint.payload.name + index + 'bottom-bar'}
          width={2}
          height={yDifference}
          x={secondSeriesPoint.x - 1}
          y={secondSeriesPoint.y + 10}
          fill={fillColor}
          radius={2}
        />
      </React.Fragment>
    );
  });
};
