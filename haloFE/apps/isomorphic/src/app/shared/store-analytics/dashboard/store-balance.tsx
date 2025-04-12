'use client';

import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import { formatNumberWithCommas } from '@core/utils/format-number';
import { PiArrowUpRight } from 'react-icons/pi';
import { Badge, Box, Flex, Text, Title } from 'rizzui';

const COLORS = {
  PASTE: '#29CCB1',
  NAVY: '#084F5B',
  SKY_BLUE: '#11AAE2',
};

type ChartData = {
  value: number;
  color: keyof typeof COLORS;
  title: string;
};

const chartData: ChartData[] = [
  {
    value: 7589478,
    color: 'PASTE',
    title: 'Company Sales',
  },
  {
    value: 9589478,
    color: 'NAVY',
    title: 'Investor Funding',
  },
  {
    value: 5589478,
    color: 'SKY_BLUE',
    title: 'Company Contract',
  },
];

export default function StoreBalance({ className }: { className?: string }) {
  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
  return (
    <WidgetCard
      title="Store Balance"
      titleClassName="lg:text-base font-normal text-gray-600"
      headerClassName="items-center"
      className={cn('@container dark:bg-gray-100/50', className)}
      description={
        <Box className="space-y-2">
          <Title as="h3" className="mt-2">
            $1,589,478
          </Title>
          <Flex gap="1">
            <Text
              as="span"
              className="flex items-center gap-1 font-semibold text-green"
            >
              <PiArrowUpRight className="size-[18px]" /> 10.2
            </Text>
            <Text as="span">+1.01% this Month</Text>
          </Flex>
        </Box>
      }
    >
      <Box className="mt-8">
        <SimpleGraph total={total} />
        <Box className="mt-8 space-y-4">
          {chartData.map((item, i) => {
            const percentage = getPercentage(item.value, total);
            return <Info percentage={percentage} key={i} data={item} />;
          })}
        </Box>
      </Box>
    </WidgetCard>
  );
}

function SimpleGraph({ total }: { total: number }) {
  return (
    <Box className="flex gap-1.5">
      {chartData.map((item, index) => {
        const percentage = getPercentage(item.value, total);
        return (
          <Box
            key={index}
            style={{
              width: `${percentage}%`,
              backgroundColor: COLORS[item.color],
            }}
            className="h-11 rounded"
          />
        );
      })}
    </Box>
  );
}

function Info({ data, percentage }: { data: ChartData; percentage: number }) {
  return (
    <Flex
      align="end"
      style={{ '--color': COLORS[data.color] } as React.CSSProperties}
    >
      <Flex gap="3">
        <Badge
          renderAsDot
          className="mt-1.5 size-2.5 shrink-0 !bg-[var(--color)]"
        />
        <Box className="space-y-1">
          <Text className="text-gray-500">{data.title}</Text>
          <Text className="text-lg font-semibold text-gray-900">
            ${formatNumberWithCommas(data.value)}
          </Text>
        </Box>
      </Flex>
      <Badge className="border-2 border-[var(--color)] bg-transparent text-gray-600">
        {percentage.toFixed(2)}%
      </Badge>
    </Flex>
  );
}

function getPercentage(value: number, total: number) {
  return (value / total) * 100;
}
