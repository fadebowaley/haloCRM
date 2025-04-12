'use client';

import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import MasterCardIcon from '@core/components/icons/mastercard';
import VisaIcon from '@core/components/icons/visa';
import TableAvatar from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { toCurrency } from '@core/utils/to-currency';
import { createColumnHelper } from '@tanstack/react-table';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Box, Checkbox, Text } from 'rizzui';
import { RecentCustomersDataType } from '.';

const columnHelper = createColumnHelper<RecentCustomersDataType>();

export const recentCustomersColumns = [
  columnHelper.accessor('id', {
    size: 30,
    enableSorting: false,
    header: ({ table }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  }),
  columnHelper.accessor('customer.fullName', {
    size: 90,
    header: 'User ID',
    enableSorting: false,
    cell: ({ row: { original } }) => <Text>#{original.id}</Text>,
  }),
  columnHelper.accessor('customer.email', {
    size: 300,
    header: 'Customer',
    enableSorting: false,
    cell: ({ row: { original } }) => (
      <TableAvatar
        src={original.customer.avatar}
        name={original.customer.fullName}
        description={original.customer.email}
      />
    ),
  }),
  columnHelper.accessor('plan', {
    size: 150,
    header: 'Plan',
    enableSorting: false,
    cell: (info) => (
      <Text className="font-medium text-gray-700">{info.getValue()}</Text>
    ),
  }),
  columnHelper.accessor('mrr', {
    size: 150,
    header: 'MRR',
    cell: (info) => (
      <Text className="font-medium text-gray-700">
        {toCurrency(info.getValue())}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    size: 200,
    header: 'Created At',
    cell: (info) => <DateCell date={new Date(info.getValue())} />,
  }),
  columnHelper.accessor('paymentMethod', {
    size: 200,
    header: 'Payment Method',
    enableSorting: false,
    cell: (info) => (
      <Text className="flex items-center gap-3 font-medium text-gray-700">
        {info.getValue().name === 'Visa' ? (
          <VisaIcon className="h-6 w-6" />
        ) : (
          <MasterCardIcon className="h-6 w-6" />
        )}
        *** {info.getValue().cardNumber}
      </Text>
    ),
  }),
  columnHelper.accessor('status', {
    size: 140,
    header: 'Status',
    cell: (info) => getStatusBadge(info.getValue()),
  }),
  columnHelper.accessor('chart', {
    size: 130,
    header: () => (
      <Text className="w-full pe-4 text-end font-semibold">Activity</Text>
    ),
    enableSorting: false,
    cell: (info) => (
      <Box className="ms-auto h-8 w-64 pe-4 4xl:h-9">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={info.getValue()}
            margin={{
              left: -30,
            }}
          >
            <Area
              type="bump"
              dataKey="activity"
              strokeWidth={1.8}
              fillOpacity={0.08}
              fill="#2465FF"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    ),
  }),
];
