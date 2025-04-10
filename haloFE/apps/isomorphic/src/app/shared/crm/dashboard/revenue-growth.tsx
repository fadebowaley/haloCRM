'use client';

import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import { useMedia } from '@core/hooks/use-media';
import { DatePicker } from '@core/ui/datepicker';
import { useState } from 'react';
import { PiArrowCircleUpRight, PiCaretDoubleUpDuotone } from 'react-icons/pi';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { Badge, Box, Text, Title } from 'rizzui';

type DataType = {
  name: string;
  Profit: number;
};

const data: DataType[] = [
  {
    name: '2016',
    Profit: 682,
  },
  {
    name: '2017',
    Profit: 690,
  },
  {
    name: '2018',
    Profit: 910,
  },
  {
    name: '2019',
    Profit: 656,
  },
  {
    name: '2020',
    Profit: 804,
  },
  {
    name: '2021',
    Profit: 747,
  },
  {
    name: '2022',
    Profit: 902,
  },
  {
    name: '2023',
    Profit: 820,
  },
  {
    name: '2024',
    Profit: 582,
  },
];

export default function RevenueGrowth({ className }: { className?: string }) {
  const [startDate, setStartDate] = useState(new Date());
  const isTablet = useMedia('(max-width: 800px)', false);

  return (
    <WidgetCard
      className={className}
      title={
        <Box>
          <Title
            as="h4"
            className="text-base font-semibold @4xl:hidden sm:text-lg"
          >
            Revenue Growth
          </Title>
          <Title
            as="h3"
            className="mt-2 flex items-center gap-2 text-2xl font-semibold"
          >
            $2,389
            <Badge
              color="success"
              variant="outline"
              className="inline-flex h-auto gap-x-2 py-0.5 pe-1 text-sm leading-none"
            >
              230 <PiArrowCircleUpRight className="size-5" />
            </Badge>
          </Title>
          <Text className="mt-2 flex items-center gap-1 text-sm font-normal text-green">
            <PiCaretDoubleUpDuotone className="me-1 size-4" />
            10.2 <span className="text-gray-500">+1.01% this Month</span>
          </Text>
        </Box>
      }
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
      <Box className="mt-6 @4xl:grid @4xl:grid-cols-10 @4xl:items-end @4xl:gap-4">
        <Box className="hidden @4xl:col-span-2 @4xl:block @7xl:col-span-1">
          <Title as="h4" className="text-base font-semibold sm:text-lg">
            Revenue Growth
          </Title>
          <Text>Yearly Report</Text>
        </Box>

        <Box className="@4xl:col-span-8 @7xl:col-span-9">
          <div className='custom-scrollbar overflow-x-auto scroll-smooth'>
            <Box className="h-72 w-full @4xl:h-60 @7xl:h-64">
              <ResponsiveContainer
                width="100%"
                height="100%"
                {...(isTablet && { minWidth: '700px' })}
              >
                <AreaChart
                  data={data}
                  margin={{
                    left: 50,
                    right: 15,
                    bottom: 25,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="revenueGrowthGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#FFCB2B1F" stopOpacity={1} />
                      <stop
                        offset="95%"
                        stopColor="#FFCB2B05"
                        stopOpacity={1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    horizontal={false}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickMargin={10}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} defaultIndex={2} />
                  <Area
                    strokeWidth={3}
                    type="monotone"
                    dataKey="Profit"
                    stroke="#FFCB2B"
                    fill="url(#revenueGrowthGradient)"
                    activeDot={{ r: 8 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </div>
        </Box>
      </Box>
    </WidgetCard>
  );
}
