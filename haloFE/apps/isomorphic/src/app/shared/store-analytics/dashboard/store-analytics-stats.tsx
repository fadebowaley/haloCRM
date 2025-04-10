'use client';

import {
  VISITOR_COLORS,
  visitorStatData,
  VisitorStatType,
} from '@/data/store-analytics-dashboard-data';
import cn from '@core/utils/class-names';
import React from 'react';
import { PiTrendDownBold, PiTrendUpBold } from 'react-icons/pi';
import { Badge, Box, Flex, Text } from 'rizzui';

export type StatCardProps = {
  className?: string;
  statItem: VisitorStatType;
};

export default function StoreAnalyticsStats({
  className,
}: {
  className?: string;
}) {
  return (
    <Box className={cn('@container', className)}>
      <Box className="grid grid-cols-1 gap-6 @lg:grid-cols-2 @4xl:grid-cols-4 @7xl/sa:gap-7 3xl:gap-8">
        {visitorStatData.map((stat, index: number) => {
          return <StatCard key={'stat-card-' + index} statItem={stat} />;
        })}
      </Box>
    </Box>
  );
}

function StatCard({ className, statItem }: StatCardProps) {
  const { title, color, value, increasedOrDecreased, lastMonthValue } =
    statItem;

  return (
    <Box
      style={
        {
          '--color-light': VISITOR_COLORS[color].light,
          '--color': VISITOR_COLORS[color].default,
        } as React.CSSProperties
      }
      className={cn(
        'space-y-3 rounded-lg border border-muted p-6 dark:bg-[#181818]',
        className
      )}
    >
      <Box className="@container/sa-stats-card">
        <Text className="text-xs font-medium text-gray-600">{title}</Text>
        <Flex className="flex-col-reverse items-end justify-between bg-red-300/0 @[17rem]/sa-stats-card:flex-row">
          <Box className="me-auto @[17rem]/sa-stats-card:pt-6">
            <Flex align="center" className="mb-2 gap-2">
              <Text className="text-lg font-semibold text-gray-900 @[11rem]/sa-stats-card:text-2xl @[17rem]/sa-stats-card:text-xl @[20rem]/sa-stats-card:text-2xl @[24rem]/sa-stats-card:text-[28px]">
                {value}
              </Text>
              <Badge className="bg-[var(--color-light)] px-1.5 py-0 text-[10px] text-[var(--color)]">
                <Text as="span" className="pe-1">
                  {increasedOrDecreased.value}%
                </Text>
                {increasedOrDecreased.state ? (
                  <PiTrendUpBold className="size-3" />
                ) : (
                  <PiTrendDownBold className="size-3" />
                )}
              </Badge>
            </Flex>
            <Text className="text-gray-400">
              vs last month:{' '}
              <Text as="span" className="font-semibold text-gray-900">
                {lastMonthValue}
              </Text>
            </Text>
          </Box>
          <Chart className="mb-2 me-auto mt-6 @[17rem]/sa-stats-card:mb-0 @[17rem]/sa-stats-card:me-0 @[17rem]/sa-stats-card:mt-0" />
        </Flex>
      </Box>
    </Box>
  );
}

function Chart({ className }: { className?: string }) {
  return (
    <Box
      className={cn(
        'flex aspect-[92/84] w-full max-w-[75px] items-end gap-1 @[24rem]/sa-stats-card:max-w-[92px]',
        className
      )}
    >
      <Text
        as="span"
        className="h-1/2 w-[calc(100%/6)] rounded-t bg-[var(--color-light)]"
      />
      <Text
        as="span"
        className="h-2/3 w-[calc(100%/6)] rounded-t bg-[var(--color-light)]"
      />
      <Text
        as="span"
        className="h-1/3 w-[calc(100%/6)] rounded-t bg-[var(--color-light)]"
      />
      <Text
        as="span"
        className="h-2/3 w-[calc(100%/6)] rounded-t bg-[var(--color)]"
      />
      <Text
        as="span"
        className="h-full w-[calc(100%/6)] rounded-t bg-[var(--color-light)]"
      />
    </Box>
  );
}
