'use client';

import { useState } from 'react';
import cn from '@core/utils/class-names';
import { Box, Flex, Title } from 'rizzui';
import { DatePicker } from '@core/ui/datepicker';
import WidgetCard from '@core/components/cards/widget-card';
import TrendingUpIcon from '@core/components/icons/trending-up';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Desktop',
    devices: 12723,
    fill: '#3962F7',
  },
  {
    name: 'Tablet',
    devices: 9304,
    fill: '#2750AF',
  },
  {
    name: 'Mobile',
    devices: 8530,
    fill: '#E6B9DE',
  },
];

export default function DeviceAnalytics({ className }: { className?: string }) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  return (
    <WidgetCard
      title="Device Analytics"
      className={cn('@container', className)}
      titleClassName="text-gray-500 font-normal text-sm sm:text-sm font-inter"
      action={
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date!)}
          dateFormat="MMM, yyyy"
          placeholderText="Select Month"
          showMonthYearPicker
          popperPlacement="bottom-end"
          inputProps={{
            variant: 'outline',
            inputClassName: 'px-2 py-1 h-auto [&_input]:text-ellipsis ring-0',
          }}
          className="w-36"
        />
      }
    >
      <Flex align="center" gap="2" className="mb-3 mt-1">
        <Title as="h2" className="font-inter text-2xl">
          2,87,095
        </Title>
        <Flex align="center" gap="1" className="text-green-dark">
          <TrendingUpIcon className="h-auto w-5" />
          <span className="font-semibold leading-none"> +32.40%</span>
        </Flex>
      </Flex>

      <Flex
        align="center"
        direction="col"
        justify="center"
        className="h-[calc(100%-80px)] @sm:flex-row"
      >
        <Box className="size-60 @lg:size-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              data={data}
              barSize={16}
              innerRadius="35%"
              outerRadius="110%"
              className="@sm:[&_>svg]:-ms-2"
            >
              <RadialBar
                background
                cornerRadius={20}
                dataKey="devices"
                className="[&_.recharts-radial-bar-background-sector]:fill-gray-100"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </Box>
        <CustomLegend className="@sm:w-36" />
      </Flex>
    </WidgetCard>
  );
}

function CustomLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-wrap justify-center gap-6 gap-x-10 @sm:flex-col @sm:items-center @md:justify-start',
        className
      )}
    >
      {data.map((item) => (
        <div
          key={item.name}
          className="flex w-2/5 flex-col items-center text-gray-500 @sm:items-start"
        >
          <div className="relative">
            <span
              className="absolute start-0 top-1/2 h-3 w-3 -translate-x-6 -translate-y-1/2 rounded rtl:translate-x-6"
              style={{ backgroundColor: item?.fill }}
            />
            <span className="block">{item.name}</span>
            <span className="font-inter text-base font-semibold leading-none text-gray-900 @sm:text-xl">
              {item.devices}+
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
