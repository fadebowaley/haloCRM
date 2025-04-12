'use client';

import { jobBoardStatData } from '@/data/job-data';
import cn from '@core/utils/class-names';
import CountUp from 'react-countup';
import { IconType } from 'react-icons/lib';
import { PiArrowDownRightBold, PiArrowUpRightBold } from 'react-icons/pi';
import { Box, Text } from 'rizzui';

type StatType = {
  icon: IconType;
  title: string;
  amount: number;
  increased: boolean;
  percentage: string;
  iconWrapperFill?: string;
  className?: string;
};

type StatCardProps = {
  className?: string;
  transaction: StatType;
};

export default function JobStats({ className }: { className?: string }) {
  return (
    <div className={cn('@container', className)}>
      <div className="custom-scrollbar overflow-x-auto scroll-smooth">
        <div className="flex items-start gap-4 @md:gap-6 3xl:gap-8">
          {jobBoardStatData.map((stat: StatType, index: number) => {
            return (
              <StatCard
                key={'stat-card-' + index}
                transaction={stat}
                className="w-full"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ className, transaction }: StatCardProps) {
  const { icon, title, amount, increased, percentage, iconWrapperFill } =
    transaction;
  const Icon = icon;
  return (
    <div
      className={cn(
        'w-full rounded-lg border border-gray-300 p-4 @2xl:p-5',
        className
      )}
    >
      <div className="mb-4 flex items-start gap-5">
        <span className="flex rounded-lg bg-[#E2EEFF] p-3 text-[#3962F7] dark:bg-[#75A1E3]/10 dark:text-[#3b66ec]">
          <Icon className="h-auto w-[28px]" strokeWidth={4} />
        </span>
        <Box className="space-y-1">
          <Text className="font-medium">{title}</Text>
          <Text className="text-[22px] font-bold text-gray-900 dark:text-gray-700 2xl:text-[20px] 3xl:text-3xl">
            <CountUp end={amount} duration={5} />
          </Text>
        </Box>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            'flex items-center gap-1',
            increased ? 'text-green-dark' : 'text-red-dark'
          )}
        >
          <span
            className={cn(
              'flex rounded-full px-2.5 py-1.5',
              increased
                ? 'bg-green-lighter/70 dark:bg-green-dark/30'
                : 'bg-red-lighter/70 dark:bg-red-dark/30'
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
        </div>
        <span className="truncate leading-none text-gray-500">
          {increased ? 'Increased' : 'Decreased'}&nbsp;last month
        </span>
      </div>
    </div>
  );
}
