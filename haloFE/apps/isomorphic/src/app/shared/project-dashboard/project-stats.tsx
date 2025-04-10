'use client';

import {
  StatType,
  projectStatData,
  projectStatViewOptions,
} from '@/data/project-dashboard';
import DropdownAction from '@core/components/charts/dropdown-action';
import cn from '@core/utils/class-names';
import { formatNumber } from '@core/utils/format-number';
import { useState } from 'react';
import { PiArrowDownRightBold, PiArrowUpRightBold } from 'react-icons/pi';
import { Box, Flex, Text, Title } from 'rizzui';

export type StatCardProps = {
  className?: string;
  transaction: StatType;
};

export default function ProjectStats({ className }: { className?: string }) {
  const [data, setData] = useState('');
  return (
    <Box className={cn('@container', className)}>
      <Flex justify="between" align="center" className="mb-6">
        <Title
          as="h1"
          className="text-base font-semibold sm:text-lg xl:text-xl"
        >
          Overview
        </Title>
        <DropdownAction
          variant="flat"
          inPortal={false}
          onChange={setData}
          className="rounded-md border"
          options={projectStatViewOptions}
        />
      </Flex>
      <div className='custom-scrollbar overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:h-0'>
        <Flex className="sm:gap-6 3xl:gap-8">
          {projectStatData.map((stat: StatType, index: number) => {
            return <StatCard key={'stat-card-' + index} transaction={stat} />;
          })}
        </Flex>
      </div>
    </Box>
  );
}

function StatCard({ className, transaction }: StatCardProps) {
  const { icon, title, amount, increased, percentage } = transaction;
  const Icon = icon;
  return (
    <Box
      className={cn(
        'group inline-block w-full rounded-lg border border-muted p-6 first:bg-slate-900 dark:bg-gray-100/50',
        className
      )}
    >
      <Flex justify="between" gap="5" className="mb-4">
        <Box className="grow space-y-2">
          <Text className="text-[22px] font-bold text-gray-900 group-first:text-gray-0 dark:text-gray-700 dark:group-first:text-gray-700 2xl:text-[20px] 3xl:text-3xl">
            {formatNumber(amount)}
          </Text>
          <Text className="whitespace-nowrap font-medium text-gray-500 group-first:text-gray-0 dark:group-first:text-gray-500">
            {title}
          </Text>
        </Box>
        <span className="flex rounded-lg bg-slate-200 p-2.5 text-gray-900 shadow-sm dark:bg-gray-50">
          <Icon className="size-7" strokeWidth={2} />
        </span>
      </Flex>
      <Flex align="center" className="gap-1.5">
        <Flex
          gap="1"
          align="center"
          className={cn(increased ? 'text-green' : 'text-red')}
        >
          <span
            className={cn(
              'flex rounded-full',
              increased
                ? 'text-green dark:text-green'
                : 'text-red dark:text-red'
            )}
          >
            {increased ? (
              <PiArrowUpRightBold className="h-auto w-4" />
            ) : (
              <PiArrowDownRightBold className="h-auto w-4" />
            )}
          </span>
          <span className="font-semibold leading-none">
            {increased ? '+' : '-'}
            {percentage}%
          </span>
        </Flex>
        <Flex className="whitespace-nowrap leading-none text-gray-500 group-first:text-gray-0 dark:group-first:text-gray-500">
          &nbsp;+1.01% this week
        </Flex>
      </Flex>
    </Box>
  );
}
