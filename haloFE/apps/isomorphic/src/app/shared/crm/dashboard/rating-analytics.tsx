'use client';

import { Box, Flex } from 'rizzui';
import cn from '@core/utils/class-names';
import WidgetCard from '@core/components/cards/widget-card';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '3 Star',
    devices: 2723,
    fill: '#FFD66B',
  },
  {
    name: '4 Star',
    devices: 6304,
    fill: '#59A7FF',
  },
  {
    name: '5 Star',
    devices: 8530,
    fill: '#29CCB1',
  },
];

export default function RatingAnalytics({ className }: { className?: string }) {
  return (
    <WidgetCard
      title="Rating Analytics"
      className={cn('@container', className)}
    >
      <Flex
        direction="col"
        justify="center"
        align="center"
        className="w-full @sm:h-full @sm:flex-row"
      >
        <Box className="my-6 size-64 @lg:size-72">
          <ResponsiveContainer
            width="100%"
            height="100%"
            className="[&_.recharts-default-legend]:flex [&_.recharts-default-legend]:flex-col [&_.recharts-default-legend]:flex-wrap [&_.recharts-legend-wrapper]:!static [&_.recharts-legend-wrapper]:!-mt-[22px] [&_.recharts-legend-wrapper]:!leading-[22px] @xs:[&_.recharts-legend-wrapper]:!mt-0 @xl:[&_.recharts-legend-wrapper]:!absolute @xl:[&_.recharts-legend-wrapper]:!end-0 @xl:[&_.recharts-legend-wrapper]:!start-auto @xl:[&_.recharts-legend-wrapper]:!top-1/2 @xl:[&_.recharts-legend-wrapper]:!-translate-y-1/2 @xl:[&_.recharts-legend-wrapper]:!translate-x-0 @xl:[&_.recharts-legend-wrapper]:!leading-9"
          >
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
        <CustomLegend className="shrink-0 @sm:w-36" />
      </Flex>
    </WidgetCard>
  );
}

function CustomLegend({ className }: { className?: string }) {
  const reversedData = [...data].reverse();
  return (
    <Flex
      justify="center"
      align="center"
      className={cn(
        'gap-x-5 gap-y-5 @sm:flex-col @sm:pt-5 @md:justify-start',
        className
      )}
    >
      {reversedData.map((item) => (
        <Box
          key={item.name}
          className="flex w-2/5 flex-col items-center text-gray-500 @sm:items-start"
        >
          <Box className="relative">
            <span
              className="absolute start-0 top-1/2 size-3 -translate-x-6 -translate-y-1/2 rounded rtl:translate-x-6"
              style={{ backgroundColor: item?.fill }}
            />
            <span className="block">{item.name}</span>
            <span className="font-inter text-base font-semibold leading-none text-gray-900 @sm:text-xl">
              {item.devices}+
            </span>
          </Box>
        </Box>
      ))}
    </Flex>
  );
}
