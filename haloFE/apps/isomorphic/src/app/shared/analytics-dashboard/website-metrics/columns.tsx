'use client';

import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Text, Title } from 'rizzui';
import { websiteMetricDataType } from '.';
import { getChartColorByEngagementRate } from '@core/components/table-utils/get-chart-color-by-engagement-rate';
import { getEngagementRate } from '@core/components/table-utils/get-engagement-rate';
import { getBounceRate } from '@core/components/table-utils/get-bounce-rate';

const columnHelper = createColumnHelper<websiteMetricDataType>();

export const websiteMetricColumns = [
  columnHelper.accessor('channel', {
    id: 'channel',
    size: 150,
    enableSorting: false,
    header: () => <span className="inline-block ps-2 lg:ps-4">Channel</span>,
    cell: ({ row }) => (
      <div className="flex items-center ps-2 lg:ps-4">
        <Title as="h6" className="mb-0.5 !text-sm font-semibold">
          {row.original.channel}
        </Title>
      </div>
    ),
  }),
  columnHelper.accessor('users', {
    id: 'users',
    size: 150,
    header: 'New Users',
    cell: ({ row }) => (
      <Text className="text-right font-medium text-gray-700 rtl:text-left">
        {row.original.users}
      </Text>
    ),
  }),
  columnHelper.display({
    id: 'sessions',
    size: 200,
    header: 'Engaged Sessions',
    cell: ({ row }) => (
      <Text className="text-right font-medium text-gray-700 rtl:text-left">
        {row.original.sessions}
      </Text>
    ),
  }),
  columnHelper.display({
    id: 'engagementRate',
    size: 200,
    header: 'Engagement Rate',
    cell: ({ row }) => (
      <div className="text-right rtl:text-left">
        {getEngagementRate(row.original.engagementRate)}
      </div>
    ),
  }),
  columnHelper.accessor('engagementTime', {
    id: 'engagementTime',
    size: 200,
    header: 'Engagement Time',
    cell: ({ row }) => (
      <div className="text-right rtl:text-left">
        <Text className="mb-1 font-medium text-gray-700">
          {dayjs(row.original.engagementTime).format('mm')}m{' '}
          {dayjs(row.original.engagementTime).format('ss')}s
        </Text>
        <Text className="text-[13px] text-gray-500">
          {dayjs(row.original.engagementTime).format('DD MMM YYYY')}
        </Text>
      </div>
    ),
  }),
  columnHelper.accessor('bounceRate', {
    id: 'bounceRate',
    size: 180,
    header: 'Bounce Rate',
    cell: ({ row }) => (
      <div className="text-right rtl:text-left">
        {getBounceRate(row.original.bounceRate)}
      </div>
    ),
  }),
  columnHelper.display({
    id: 'chart',
    size: 300,
    header: () => <span className="inline-block pe-2 lg:pe-4">Activity</span>,
    cell: ({ row }) => (
      <>
        <div className="ms-auto h-8 w-full max-w-[280px] pe-2 lg:pe-4 4xl:h-9">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={row.original.chart}
              margin={{
                left: -30,
              }}
            >
              <defs>
                <linearGradient
                  id={`deviceSessionsMobile-${row.original.id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#F0F1FF"
                    className="[stop-opacity:0.25] dark:[stop-opacity:0.2]"
                  />
                  <stop
                    offset="95%"
                    stopColor={getChartColorByEngagementRate(
                      row.original.engagementRate
                    )}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                type="bump"
                dataKey="count"
                stroke={getChartColorByEngagementRate(
                  row.original.engagementRate
                )}
                strokeWidth={1.8}
                fillOpacity={1}
                fill={`url(#deviceSessionsMobile-${row.original.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </>
    ),
  }),
];
