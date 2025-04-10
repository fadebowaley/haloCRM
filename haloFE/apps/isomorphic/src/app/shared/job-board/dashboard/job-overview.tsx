'use client';

import {
  JOB_OVERVIEW_COLORS,
  jobOverviewDailyData,
  jobOverviewMonthlyData,
  jobOverviewOptions,
  jobOverviewTicketStatus,
} from '@/data/job-data';
import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import { CustomYAxisTick } from '@core/components/charts/custom-yaxis-tick';
import DropdownAction from '@core/components/charts/dropdown-action';
import TrendingUpIcon from '@core/components/icons/trending-up';
import { useMedia } from '@core/hooks/use-media';
import cn from '@core/utils/class-names';
import { formatNumber } from '@core/utils/format-number';
import { useState } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Flex, Text, Title } from 'rizzui';

export default function JobOverview({ className }: { className?: string }) {
  const [data, setData] = useState(jobOverviewDailyData);
  const isTab = useMedia('(max-width: 768px)', false);
  const barSize = isTab ? 16 : 24;

  function handleChange(viewType: string) {
    if (viewType === 'month') {
      setData(jobOverviewMonthlyData);
    } else {
      setData(jobOverviewDailyData);
    }
  }

  return (
    <WidgetCard
      title="Job Overview"
      className={cn('min-h-[28rem]', className)}
      titleClassName="font-normal text-sm sm:text-sm text-gray-500 mb-2.5 font-inter"
      action={
        <Flex align="center" gap="5">
          <Legend className="hidden @2xl:flex" />
          <DropdownAction
            className="rounded-md border"
            options={jobOverviewOptions}
            onChange={handleChange}
            dropdownClassName="!z-0"
          />
        </Flex>
      }
    >
      <Flex align="center" className="gap-0">
        <Title as="h2" className="me-2 text-2xl">
          80,345
        </Title>
        <Text className="flex items-center leading-none text-gray-500">
          <Text
            as="span"
            className={cn(
              'me-2 inline-flex items-center font-medium text-green'
            )}
          >
            <TrendingUpIcon className="me-1 h-4 w-4" />
            32.40%
          </Text>
        </Text>
      </Flex>
      <Legend className="my-4 flex @md:justify-end @2xl:hidden" />
      <div className="custom-scrollbar overflow-x-auto scroll-smooth">
        <div className="h-[20rem] w-full pt-6 @lg:pt-8 lg:h-[24rem] 3xl:h-[25rem]">
          <ResponsiveContainer width="100%" height="100%" minWidth={700}>
            <ComposedChart
              data={data}
              margin={{
                left: -6,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
            >
              <CartesianGrid
                vertical={false}
                strokeOpacity={0.435}
                strokeDasharray="8 10"
              />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={({ payload, ...rest }) => {
                  const pl = {
                    ...payload,
                    value: formatNumber(Number(payload.value)),
                  };
                  return (
                    <CustomYAxisTick prefix={'$'} payload={pl} {...rest} />
                  );
                }}
              />
              <Tooltip content={<CustomTooltip formattedNumber />} />
              <Bar
                dataKey="activeJobs"
                fill={JOB_OVERVIEW_COLORS[0]}
                stroke={JOB_OVERVIEW_COLORS[0]}
                barSize={barSize}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="natural"
                dataKey="onHold"
                fill={JOB_OVERVIEW_COLORS[1]}
                stroke={JOB_OVERVIEW_COLORS[1]}
                barSize={barSize}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="natural"
                dataKey="shortlisted"
                fill={JOB_OVERVIEW_COLORS[2]}
                stroke={JOB_OVERVIEW_COLORS[2]}
                barSize={barSize}
                radius={[4, 4, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </WidgetCard>
  );
}

function Legend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-start gap-3 text-xs @3xl:text-sm lg:gap-4',
        className
      )}
    >
      {jobOverviewTicketStatus.map((item, index) => (
        <div key={item.name} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: JOB_OVERVIEW_COLORS[index] }}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
