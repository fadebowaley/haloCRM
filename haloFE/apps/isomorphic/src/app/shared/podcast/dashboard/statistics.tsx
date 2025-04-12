'use client';

import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import cn from '@core/utils/class-names';
import { useMedia } from 'react-use';
import {
  CartesianGrid,
  ComposedChart,
  Customized,
  Line,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box } from 'rizzui/box';
import { Flex } from 'rizzui/flex';
import { Text } from 'rizzui/typography';

const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 9800,
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 3908,
  },
  {
    name: 'May',
    uv: 1890,
    pv: 4800,
  },
  {
    name: 'Jun',
    uv: 2390,
    pv: 3800,
  },
  {
    name: 'Jul',
    uv: 3490,
    pv: 4300,
  },
  {
    name: 'Aug',
    uv: 6490,
    pv: 2300,
  },
  {
    name: 'Sep',
    uv: 4490,
    pv: 3300,
  },
  {
    name: 'Oct',
    uv: 3490,
    pv: 6300,
  },
  {
    name: 'Nov',
    uv: 2490,
    pv: 1300,
  },
  {
    name: 'Dec',
    uv: 5490,
    pv: 3300,
  },
];

export default function PodcastsStatistics({
  className,
}: {
  className?: string;
}) {
  const isTablet = useMedia('(max-width: 820px)', false);

  return (
    <WidgetCard
      title="Visitors Statistics"
      description="Revealing risk and growth in investments."
      headerClassName="mb-6 items-baseline flex-wrap gap-4 @3xl:flex-nowrap [&>div]:ps-0"
      className={cn('@container', className)}
      action={
        <Flex gap="0" className="">
          <Box className="border-r px-3 pl-0 @3xl:pl-3">
            <Text as="span">Earned</Text>
            <Text className="text-lg font-semibold text-gray-900">$14,478</Text>
          </Box>
          <Box className="px-3">
            <Text as="span">Subscribers</Text>
            <Text className="text-lg font-semibold text-gray-900">12.48M</Text>
          </Box>
        </Flex>
      }
    >
      <div className="custom-scrollbar overflow-x-auto scroll-smooth">
        <div className="h-[225px] w-full @lg/pod:h-[280px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '700px' })}
          >
            <ComposedChart
              data={data}
              margin={{
                left: -10,
              }}
            >
              <CartesianGrid strokeDasharray="6 6" vertical={false} />
              <XAxis
                dataKey="name"
                padding={{
                  left: 20,
                  right: 20,
                }}
                tickLine={false}
              />
              <YAxis tickLine={false} tickFormatter={formatYAxis} />
              <Tooltip defaultIndex={3} content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#FE9738"
                activeDot={{ r: 8 }}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="uv"
                stroke="#02BC7D"
                dot={false}
              />
              <Customized component={CustomizedRectangle} />
            </ComposedChart>
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
  const x = props.activeCoordinate?.x;

  return x ? (
    <>
      <defs>
        <linearGradient id="uvGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255, 126, 58, 0.04)" />
          <stop offset="100%" stopColor="rgba(255, 126, 58, 0.4)" />
        </linearGradient>
      </defs>
      <Rectangle
        key="uv"
        width={40}
        height={props.height - 30}
        x={props.activeCoordinate?.x - 20}
        y={0}
        fill="url(#uvGradient)"
        radius={[12, 12, 0, 0]}
      />
    </>
  ) : null;
};
