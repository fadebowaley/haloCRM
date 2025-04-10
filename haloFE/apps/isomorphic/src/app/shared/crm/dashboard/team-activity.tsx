'use client';

import { Box, Flex, Text } from 'rizzui';
import cn from '@core/utils/class-names';
import WidgetCard from '@core/components/cards/widget-card';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useElementSize } from '@core/hooks/use-element-size';

const data = [
  {
    name: '5 Star',
    devices: 8530,
    fill: '#29CCB1',
    id: '#ratingShadowOne',
  },
  {
    name: '4 Star',
    devices: 6304,
    fill: '#34B3F1',
    id: '#ratingShadowOne',
  },
  {
    name: '3 Star',
    devices: 2723,
    fill: '#FE9738',
    id: '#ratingShadowOne',
  },
];

const valueSum = data.reduce((total, item) => total + item.devices, 0);
const calculatePercentage = (part: number, total: number) =>
  ((part / total) * 100).toFixed(2);

export default function TeamActivity({ className }: { className?: string }) {
  const [ref, { width }] = useElementSize();
  const isLG = width > 430;

  return (
    <WidgetCard
      ref={ref as React.Ref<HTMLDivElement>}
      title="Team activity"
      className={cn('@container', className)}
    >
      <Box className="flex size-full flex-col items-center justify-center pb-4">
        <Box className="relative h-60 w-full shrink-0 @sm:mt-8 @sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart
              margin={{
                top: 40,
              }}
              className="relative [&>.recharts-surface]:mx-auto [&>.recharts-surface]:max-w-md [&>.recharts-surface]:md:max-w-none"
            >
              <Pie
                label={({ value }) =>
                  `${calculatePercentage(value, valueSum)}%`
                }
                data={data}
                stroke="none"
                endAngle={-10}
                startAngle={190}
                paddingAngle={1}
                dataKey="devices"
                innerRadius={isLG ? 120 : 80}
                outerRadius={isLG ? 140 : 100}
              />
            </PieChart>
          </ResponsiveContainer>

          <Flex
            className="absolute inset-0"
            justify="center"
            align="center"
            direction="col"
            gap="1"
          >
            <Text className="text-2xl font-bold text-gray-800 @2xl:text-3xl">
              100%
            </Text>
            <Text className="font-medium">Completed</Text>
          </Flex>
        </Box>
        <Flex justify="center" className="-mt-8 flex-wrap @lg:gap-8">
          {data.map((item) => (
            <Box key={item.name} className="space-y-2">
              <Flex align="center" gap="1">
                <span
                  className="me-2 size-3.5 flex-shrink-0"
                  style={{ backgroundColor: item.fill }}
                />
                <Text as="span" className="whitespace-nowrap">
                  {item.name}
                </Text>
              </Flex>
              <Text as="p" className="ms-[26px] font-medium">
                {calculatePercentage(item.devices, valueSum)}%
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </WidgetCard>
  );
}
