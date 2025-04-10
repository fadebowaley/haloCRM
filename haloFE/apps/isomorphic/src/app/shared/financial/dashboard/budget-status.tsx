'use client';

import React from 'react';
import WidgetCard from '@core/components/cards/widget-card';
import { Tooltip } from 'rizzui';
import cn from '@core/utils/class-names';

const calculatePercentage = (total: number, value: number): string =>
  ((value / total) * 100).toFixed(2);

const rulerSteps = [
  '00',
  '1K',
  '2K',
  '3K',
  '4K',
  '5K',
  '6K',
  '7K',
  '8K',
  '9K',
  '10K',
];

interface RulerProps {
  total: number;
  value: number;
}

const Ruler: React.FC<RulerProps> = ({ total, value }) => {
  const percentage = calculatePercentage(total, value);
  return (
    <div>
      <div className="relative flex h-10 flex-col justify-end overflow-hidden rounded-[10px] bg-gray-100">
        <div
          className="absolute bottom-0 left-0 top-0 z-10 h-full bg-primary"
          style={{ width: `${percentage}%` }}
        />
        <div className="relative z-20 mt-auto flex w-full items-end justify-between [&>:nth-child(10n+1)]:!h-4">
          {[...Array(101)].map((_, index) => (
            <span
              key={index}
              className="h-2.5 w-[1px] bg-gray-900 dark:bg-gray-300"
            />
          ))}
        </div>
      </div>
      <div className="mt-1.5 flex justify-between">
        {rulerSteps.map((item, index) => (
          <div
            key={index}
            className="flex w-[1px] justify-center first-of-type:justify-start last-of-type:justify-end"
          >
            <span className="text-xs text-gray-500">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SliderProps {
  title: string;
  total: number;
  value: number;
}

const Slider: React.FC<SliderProps> = ({ title, total, value }) => {
  const percentage = calculatePercentage(total, value);
  return (
    <div className="group">
      <div className="mb-2.5 flex items-center justify-between">
        <p className="font-medium text-gray-900">{title}</p>
        <div className="flex items-center">
          <span className="font-medium text-gray-900">${value.toFixed(2)}</span>
          &nbsp;
          <span>/${total}</span>
        </div>
      </div>
      <div className="relative h-2.5 w-full rounded-lg bg-gray-100">
        <div
          style={{ width: `${percentage}%` }}
          className="h-full rounded-lg bg-primary"
        />
        <div className="absolute left-0 top-1/2 flex h-0 w-full -translate-y-1/2 items-center">
          <div className="relative w-full">
            <Tooltip
              className="dark:bg-gray-200 dark:text-gray-900"
              placement="top"
              content={<span>{percentage}%</span>}
            >
              <span
                style={{ left: `${percentage}%` }}
                className="absolute top-1/2 block h-5 w-5 -translate-x-1/2 -translate-y-1/2 scale-75 cursor-pointer rounded-full border-[5.5px] border-gray-0 bg-primary opacity-0 shadow-md transition-all duration-100 group-hover:scale-100 group-hover:opacity-100 dark:border-muted"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BudgetStatusProps {
  className?: string;
}

const BudgetStatus: React.FC<BudgetStatusProps> = ({ className }) => {
  const budgetData = [
    { title: 'Desler Inc & Co.', total: 350, value: 108.9 },
    { title: 'Matro Private Ltd.', total: 580, value: 413.5 },
    { title: 'Hanry & Brothers', total: 350, value: 108.9 },
    { title: 'Ammey Beauty Parler', total: 1250, value: 893.7 },
  ];

  return (
    <WidgetCard
      title="Budget Status"
      headerClassName="flex @[30rem]:flex-row flex-col"
      actionClassName="ps-0 mb-4 @[30rem]:mb-4"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter mt-1 mb-2.5 @[30rem]:mb-7"
      className={cn('', className)}
      action={
        <div className="flex items-center gap-1 @[30rem]:gap-2">
          <span className="text-lg font-semibold text-gray-900 @[30rem]:text-xl">
            $7,590
          </span>
          <span className="text-gray-500">out of</span>
          <span className="text-lg font-semibold text-gray-900 @[30rem]:text-xl">
            $10,000
          </span>
        </div>
      }
    >
      <Ruler total={10000} value={7590} />
      <div className="mt-12 space-y-7">
        {budgetData.map((item, index) => (
          <Slider key={index} {...item} />
        ))}
      </div>
    </WidgetCard>
  );
};

export default BudgetStatus;
