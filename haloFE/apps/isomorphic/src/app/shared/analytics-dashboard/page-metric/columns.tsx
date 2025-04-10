'use client';

import {
  getChartColorByTrafficShare,
  getTrafficShare,
} from '@core/components/table-utils/get-traffic-share';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { PiArrowSquareOut } from 'react-icons/pi';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import { Flex, Text, Title } from 'rizzui';
import { PageMetricDataType } from '.';

const formatter = Intl.NumberFormat('en', {
  notation: 'compact',
});

const columnHelper = createColumnHelper<PageMetricDataType>();

export const pageMetricsColumns = [
  columnHelper.accessor('pages', {
    id: 'pages',
    size: 220,
    header: () => (
      <Text as="span" className="inline-block ps-2 font-semibold lg:ps-4">
        Pages
      </Text>
    ),
    cell: ({ row }) => (
      <Flex align="center" className="gap-0 ps-2 lg:ps-4">
        <Title as="h6" className="mb-0.5 me-1.5 !text-sm font-semibold">
          {row.original.pages}
        </Title>
        <PiArrowSquareOut strokeWidth={4} className="size-4" />
      </Flex>
    ),
  }),
  columnHelper.accessor('trafficShare', {
    id: 'trafficShare',
    size: 200,
    header: 'Traffic Share',
    cell: (info) => <>{getTrafficShare(info.getValue())}</>,
  }),
  columnHelper.accessor('uniquePreviews', {
    id: 'uniquePreviews',
    size: 250,
    header: 'Unique Previews',
    cell: (info) => (
      <span className="font-medium">{formatter.format(info.getValue())}</span>
    ),
  }),
  columnHelper.display({
    id: 'createdAt',
    size: 250,
    header: 'AVG. SESSION DURATION',
    cell: (info) => (
      <div>
        <Text className="mb-1 font-medium text-gray-700">
          {dayjs(info.getValue() as string).format('mm')}m{' '}
          {dayjs(info.getValue() as string).format('ss')}s
        </Text>
        <Text className="text-[13px] text-gray-500">
          {dayjs(info.getValue() as string).format('DD MMM YYYY')}
        </Text>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'chart',
    size: 200,
    header: () => (
      <Text className="w-full pe-2 text-end font-semibold text-gray-500 lg:pe-4">
        Activity
      </Text>
    ),
    cell: ({ row }) => (
      <div className="ms-auto h-8 w-full max-w-[240px] pe-2 lg:pe-4 4xl:h-9">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart barSize={4} barGap={3} data={row.original.chart}>
            <Bar
              dataKey="count"
              fill={getChartColorByTrafficShare(row.original.trafficShare)}
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    ),
  }),
];
