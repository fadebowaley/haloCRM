'use client';

import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import AvatarCard from '@core/ui/avatar-card';
import { getRelativeTime } from '@core/utils/get-relative-time';
import { createColumnHelper } from '@tanstack/react-table';
import Image from 'next/image';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Button, Checkbox, Flex } from 'rizzui';
import { CustomersWithMostTicketDataType } from '.';

function chartColor(value: number) {
  if (value > 70) return '#16a679';
  if (value > 40) return '#d89b0d';
  return '#c5280c';
}

const statusColors = {
  'In Progress': 'info',
  Completed: 'success',
  Open: 'secondary',
  Closed: 'danger',
};

const columnHelper = createColumnHelper<CustomersWithMostTicketDataType>();

export const customersWithMostTicketColumns = [
  columnHelper.display({
    id: 'select',
    size: 50,
    cell: ({ row }) => (
      <Checkbox
        variant="flat"
        className="ps-3.5"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  }),
  columnHelper.accessor('user.name', {
    id: 'user',
    size: 250,
    header: 'Name',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.user.avatar}
        name={row.original.user.name}
      />
    ),
  }),
  columnHelper.accessor('ticketsCount', {
    id: 'ticketsCount',
    size: 200,
    header: 'Tickets Count',
    cell: ({ row }) => (
      <span className="mr-6 block whitespace-nowrap pe-6 text-right">
        {row.original.ticketsCount}
      </span>
    ),
  }),
  columnHelper.accessor('location.country', {
    id: 'location',
    size: 200,
    header: 'Country',
    enableSorting: false,
    cell: ({ row }) => (
      <Flex align="center" gap="2">
        <figure className="relative h-7 w-7">
          <Image
            fill
            quality={100}
            alt={`${row.original.location.country} Flag icon`}
            src={`https://flagcdn.com/${row.original.location.countryCode.toLowerCase()}.svg`}
            sizes="(max-width: 768px) 100vw"
            className="object-contain"
          />
        </figure>
        <span className="whitespace-nowrap">
          {row.original.location.country}
        </span>
      </Flex>
    ),
  }),
  columnHelper.accessor('lastCreated', {
    id: 'lastCreated',
    size: 150,
    header: 'Last Ticket',
    cell: ({ row }) => (
      <span className="whitespace-nowrap font-semibold text-gray-700">
        {getRelativeTime(new Date(row.original.lastCreated))}
      </span>
    ),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 150,
    header: 'Status',
    cell: ({ row }) => (
      <Button
        size="sm"
        as="span"
        variant="outline"
        className="w-[90px] whitespace-nowrap font-medium"
        color={
          statusColors[row.original.status as keyof typeof statusColors] as any
        }
      >
        {row.original.status}
      </Button>
    ),
  }),
  columnHelper.display({
    id: 'chart',
    size: 250,
    header: () => <span className="block pe-2 text-end lg:pe-4">Activity</span>,
    cell: ({ row }) => (
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
                id={`deviceSessionsMobile-${row.id}`}
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
                  stopColor={chartColor(row.original.engagementRate)}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type="bump"
              dataKey="count"
              stroke={chartColor(row.original.engagementRate)}
              strokeWidth={1.8}
              fillOpacity={1}
              fill={`url(#deviceSessionsMobile-${row.id})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'actions',
    size: 120,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <TableRowActionGroup
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
];
