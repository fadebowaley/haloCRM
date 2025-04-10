'use client';

import { Box, Text } from 'rizzui';
import cn from '@core/utils/class-names';
import WidgetCard from '@core/components/cards/widget-card';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Amazon', value: 450 },
  { name: 'AliExpress', value: 250 },
  { name: 'TF', value: 150 },
  { name: 'Alibaba', value: 150 },
];

const valueSum = data.reduce((total, item) => total + item.value, 0);
const calculatePercentage = (part: number, total: number) =>
  ((part / total) * 100).toFixed(0);

const COLORS = ['#6956E5', '#FB896B', '#F8C07F', '#A5D2F2'];

export default function CustomerAreaByPlatform({
  className,
}: {
  className?: string;
}) {
  return (
    <WidgetCard
      title="Customer Area by Platforms"
      className={cn('@container', className)}
    >
      <Box className="relative mx-auto my-2.5 size-[300px] @sm:size-[340px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="relative z-10"
        >
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              dataKey="value"
              innerRadius="55%"
              outerRadius="70%"
              fill="#8884d8"
              paddingAngle={2}
              data={data}
              label={({ value }) => `${calculatePercentage(value, valueSum)}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Box className="absolute inset-10 rounded-full border-[48px] border-white bg-gray-100/70 shadow-[0px_4px_20px_0px_#00000029] @sm:border-[54px] dark:border-gray-0" />
        <Box className="absolute inset-28 rounded-full bg-white dark:bg-gray-0" />
      </Box>
      <Box className="flex flex-wrap justify-center gap-4 @lg:gap-8">
        {data.map((item, index) => (
          <Box key={item.name} className="grid gap-2">
            <Box className="flex items-center">
              <span
                className="me-2 h-2.5 w-3.5 flex-shrink-0"
                style={{ backgroundColor: COLORS[index] }}
              />
              <Text as="span" className="whitespace-nowrap">
                {item.name}
              </Text>
            </Box>
            <Text as="p" className="ms-5 font-medium">
              {calculatePercentage(item.value, valueSum)}%
            </Text>
          </Box>
        ))}
      </Box>
    </WidgetCard>
  );
}
